import { lazy, useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { data } from "../../data";
import { getSession } from "../../actions/session";
import { toTitleCase } from '../../helpers/letterCaseChange';
import axios from "axios";
import { successDialog, errorDialog, warningDialog, infoDialog } from "../../helpers/alerts.js";
import uploadFile from '../../helpers/uploadFile.js';
import './style.css';

const CardFeaturedProduct = lazy(() => import("../../components/card/CardFeaturedProduct"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const TermsConditions = lazy(() => import("../../components/others/TermsConditions"));
const QuestionAnswer = lazy(() => import("../../components/others/QuestionAnswer"));
const OurAssurance = lazy(() => import("../../components/others/OurAssurance"));
const SizeChart = lazy(() => import("../../components/others/SizeChart"));

const ProductDetailView = () => {
  const [sessionData, setSessionData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const { id } = useParams();
  const detailsRef = useRef(null);
  const inspectionRef = useRef(null);
  const detailsTitle = useRef(null);
  const detailsPrice = useRef(null);
  const detailsDescription = useRef(null);
  const detailsAddress = useRef(null);
  const detailsState = useRef(null);
  const detailsPostalCode = useRef(null);
  const [useAxiosDescription, setUseAxiosDescription] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setSessionData(session);
    }

    if (id !== "") {
      if (id !== "new") {
        setIsEditMode(false);
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_URL}/api/vehicle/${id}`,
          headers: {},
          data: data
        };

        axios.request(config)
          .then((response) => {
            if (response.data.status === false) {
              errorDialog("Invalid ad ID").then(() => {
                window.location.href = "/listing";
              });
            } else {
              setVehicleData(response.data.data);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            errorDialog("An error occurred while fetching the vehicle data.");
            console.log(error);
          });
      } else {
        if (session) {
          if (session.role !== "seller") {
            warningDialog("You are not a seller!").then(() => {
              window.location.href = "/listing";
            });
          }
          if (vehicleData) {
            window.location.reload();
          }
          setIsNew(true);
          setIsEditMode(true);
          setIsLoading(false);
        } else {
          infoDialog("Log in to post a new ad").then(() => {
            window.location.href = "/account/signin";
          });
          window.location.href = "/account/signin";
        }
      }
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditMode(true);
    if (vehicleData.inspection_status === 'accepted') {
      warningDialog('Modifying inspection booking details (date/location) will cause additional payment as a mechanic has already accepted the booking.');
    }
  };

  const checkInspectionDate = (inspectionDate) => {
    const today = new Date();
    if (inspectionDate > today) {
      return true;
    } else {
      return false;
    }
  }

  const handleSaveClick = () => {
    infoDialog('Saving changes...');
    if (detailsRef.current) {
      const details = detailsRef.current.getDetails();
      details.title = detailsTitle.current.value;
      details.price = detailsPrice.current.value;
      details.description = detailsDescription.current.value;
      details.address = detailsAddress.current.value;
      details.state = detailsState.current.value;
      details.postal_code = detailsPostalCode.current.value;
      details.seller_id = sessionData.user_id;

      if (detailsDescription.current.value.length < 250) {
        warningDialog('Please enter a description with at least 250 characters!');
        return;
      }

      details.inspection_status = "not_requested";
      const inspection = inspectionRef.current.getDetails();
      if (details.postal_code !== '' && inspection.inspectionDate !== '') {
        if (checkInspectionDate(new Date(inspection.inspectionDate))) {
          details.inspection_status = "requested";
          details.inspection_report = {
            "status": details.inspection_status,
            "vehicle_rego": inspection.inspectionRego,
            "postal_code": details.postal_code,
            "inspection_time": (inspection.inspectionDate).replace(/-/g, '/')
          };
        } else {
          warningDialog("Inspection date cannot be today or before. Please try again with a future date.");
          return;
        }
      }

      var data = null;
      if (isNew) {
        data = JSON.stringify({
          "title": details.title,
          "color": details.color,
          "brand": details.brand,
          "model": details.model,
          "yom": details.yom,
          "condition": details.condition,
          "transmission": details.transmission,
          "body_type": details.body_type,
          "fuel_type": details.fuel_type,
          "mileage": details.mileage,
          "description": details.description,
          "price": details.price,
          "seller_id": details.seller_id,
          "inspection_status": details.inspection_status,
          "address": details.address,
          "state": details.state,
          "postal_code": details.postal_code,
          "inspection_report": {
            "status": details.inspection_status,
            "vehicle_rego": inspection.inspectionRego,
            "postal_code": details.postal_code,
            "inspection_time": `${inspection.inspectionDate.replace(/-/g, '/')} ${inspection.inspectionTime}`
          },
          "files": uploadedImageIds
        });
      } else {
        data = createDataIfDifferent(details, vehicleData);
        if (data) {
          console.log("Data to be sent:", data);
        } else {
          console.log("No differences found.");
        }
      }

      let config = {
        method: isNew ? 'POST' : 'PUT',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/vehicle/`,
        headers: {
          'Authorization': `Token ${sessionData.token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (response.data.status) {
            if (id === "new") {
              alert("Ad posted successfully.");
            } else {
              alert("Ad updated successfully.");
            }
            window.location.href = "/listing/" + response.data.data._id;
          } else {
            console.log(JSON.stringify(response.data));
            if (typeof response.data.msg === 'string' && response.data.msg.includes('not allowed to be empty')) {
              warningDialog("All fields must be filled. Please try again.")
            } else {
              console.log(response);
              errorDialog("An error occurred. Please try again.");
            }
          }
        })
        .catch((error) => {
          errorDialog("An error occurred. Please try again.");
          console.log(error);
        });
    }
  };

  const handleCancelClick = () => {
    alert('Cancelling edit mode...');
    setIsEditMode(false);
    if (id === "new") {
      window.location.href = "/listing";
    }
  };

  const handleDeleteClick = () => {
    alert('Deleting ad...');
    setIsEditMode(false);
  };

  const handleAssignInspection = (state) => {
    alert('Inspection ' + state + 'ing...');

    let data = {
      _id: vehicleData.inspection_report._id
    };

    if (state === "assign") {
      data.mechanic = sessionData.user_id;
      data.status = "assigned";
    }

    data = JSON.stringify(data);

    let config = {
      method: state === "assign" ? 'PUT' : 'POST',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/inspection-report${state === "unassign" ? '/unassign' : ''}`,
      headers: {
        'Authorization': `Token ${sessionData ? sessionData.token : ''}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.data.status) {
          alert("Inspection " + state + "ed successfully!");
          window.location.reload();
        } else {
          alert("Error! Please try again.");
        }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        alert("Error! Please try again.");
        console.log(error);
      });

  };

  const createDataIfDifferent = (newData, savedData) => {
    const data = {};

    for (let key in newData) {
      if (newData[key] === null || newData[key] === '') {
        data[key] = savedData[key];
      } else if (newData[key] !== savedData[key]) {
        data[key] = newData[key];
      }
    }
    data["_id"] = id;
    return Object.keys(data).length ? JSON.stringify(data) : null;
  };

  const fetchAddressSuggestions = async (query) => {
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&filter=countrycode:au&apiKey=${apiKey}`);
    const data = await response.json();
    return data.features;
  };

  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setSuggestions([]);
    if (query.length >= 3) {
      const results = await fetchAddressSuggestions(query);
      setSuggestions(results);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    detailsAddress.current.value = suggestion.properties.address_line1 + ', ' + suggestion.properties.city || '';
    detailsState.current.value = suggestion.properties.state_code || '';
    detailsPostalCode.current.value = suggestion.properties.postcode || '';
    setSuggestions([]);
  };

  const handleGenerateDescription = async () => {
    alert("AI");
    if (detailsRef.current) {
      const details = detailsRef.current.getDetails();
      const isEmptyOrNull = (value) => value === null || value === '';

      const fieldsToCheck = [
        'color', 'brand', 'model', 'yom', 'condition', 'transmission',
        'body_type', 'fuel_type', 'mileage', 'price', 'address', 'state', 'postal_code'
      ];

      const hasEmptyFields = fieldsToCheck.some(field => isEmptyOrNull(details[field]));

      if (!hasEmptyFields) {
        details.mileage = details.mileage + " Km";
        let config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_AI_URL}/generate`,
          data: details
        };

        axios.request(config)
          .then((response) => {
            console.log(response.data.description);
            var backendDescription = response.data.description;
            const textarea = document.getElementById('descriptionTextarea');
            setUseAxiosDescription(true);
            textarea.value = "";
            let index = 0;
            const interval = setInterval(() => {
              if (textarea) {
                textarea.value += backendDescription[index];
              }
              index++;
              if (index === backendDescription.length) {
                clearInterval(interval);
              }
            }, 20); // Adjust the speed of typing here
            setUseAxiosDescription(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert('All vehicle details must be filled out to provide an accurate and detailed description using the AI writer. Please ensure no fields are left empty.')
        return;
      }
    }
  };

  const handleImageClick = (event) => {
    if (imageUploading) return;

    if (!isEditMode) {
      // Swap images logic
      const firstImage = document.querySelector('.img-fluid.mb-3');
      const clickedImage = event.target;

      if (firstImage && clickedImage && firstImage !== clickedImage) {
        const tempSrc = firstImage.src;
        firstImage.src = clickedImage.src;
        clickedImage.src = tempSrc;
      }
    } else {
      // Image upload logic
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (inputEvent) => {
        const file = inputEvent.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setImageUploading(true);
          try {
            const response = await uploadFile(file, `Token ${sessionData.token}`);
            if (response.status) {
              const newImageId = response.data._id;

              const imageUrl = URL.createObjectURL(file);
              event.target.src = imageUrl; // Replace the clicked image
              // Update the state with the new image ID
              setUploadedImageIds((prevIds) => {
                // Remove the old image ID if it exists
                const updatedIds = prevIds.filter(id => id !== event.target.dataset.imageId);
                // Add the new image ID
                return [...updatedIds, newImageId];
              });

              // Update the data-image-id attribute of the clicked image
              event.target.dataset.imageId = newImageId;
              console.log(uploadedImageIds);
              alert('Image uploaded successfully');
            } else {
              console.log(response);
              alert('Image uploaded successfully');
            }
          } catch (err) {
            alert('Failed to upload image' + err);
          } finally {
            setImageUploading(false);
          }
        } else {
          alert('Please select a valid image file');
        }
      };
      input.click();
    }
  };

  return (
    <div className="container-fluid mt-3">
      {!isLoading ? <>
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center" style={{ position: "relative" }}>
                {imageUploading && <div className="spinner-overlay" role="status"><span className="sr-only spinner-border"></span></div>}
                {/* {selectedImage && <img src={selectedImage} className="img-fluid mb-3" alt="Selected" />} */}
                <img
                  src="../../images/products/vehicle.jpg"
                  className="img-fluid mb-3"
                  alt=""
                  onClick={handleImageClick}
                  data-image-id=""
                />
                <img
                  src="../../images/products/vehicle.jpg"
                  className="border border-secondary me-2"
                  width="75"
                  height="50"
                  alt="..."
                  onClick={handleImageClick}
                  data-image-id=""
                />
                <img
                  src="../../images/products/vehicle.jpg"
                  className="border border-secondary me-2"
                  width="75"
                  height="50"
                  alt="..."
                  onClick={handleImageClick}
                  data-image-id=""
                />
                <img
                  src="../../images/products/vehicle.jpg"
                  className="border border-secondary me-2"
                  width="75"
                  height="50"
                  alt="..."
                  onClick={handleImageClick}
                  data-image-id=""
                />
              </div>
              <div className="col-md-7">
                {sessionData && (isNew || sessionData.user_id === vehicleData.seller_id._id) && <>
                  {isEditMode && <span className="badge bg-dark me-2 float-right" onClick={handleCancelClick}>Cancel</span>}
                  {!isEditMode && <span className="badge bg-dark me-2 float-right" onClick={handleDeleteClick}>Delete</span>}
                  <span className="badge bg-primary me-2 float-right" onClick={isEditMode ? handleSaveClick : handleEditClick}>{isEditMode ? 'Save' : 'Edit'}</span>
                </>}
                {sessionData && (!isNew && vehicleData.inspection_report && vehicleData.inspection_report.status === "requested" && sessionData.role === "mechanic") && <>
                  <span className="badge bg-primary me-2 float-right" onClick={() => handleAssignInspection("assign")}>Assign Inspection</span>
                </>}
                {sessionData && (!isNew && vehicleData.inspection_report && vehicleData.inspection_report.status === "assigned" && vehicleData.inspection_report.mechanic === sessionData.user_id) && <>
                  <span className="badge bg-dark me-2 float-right" onClick={() => handleAssignInspection("unassign")}>Unassign Inspection</span>
                </>}
                <h1 className="fw-bold h5 d-inline me-2">{isEditMode ? <><label style={{ fontSize: "small", fontWeight: "normal" }}>Ad Title</label><br></br><input type="text" className="form-control mw-180" ref={detailsTitle} defaultValue={vehicleData !== null ? vehicleData.title : ''} placeholder="Title" /></> : <>{vehicleData !== null ? toTitleCase(vehicleData.title) : ''}</>}</h1>
                {!isEditMode && (
                  <>
                    <span className="badge bg-success me-2">New</span>
                    <span className="badge bg-danger me-2">Hot</span>
                  </>
                )}
                <div className="">
                  <span className="h5 me-2">{isEditMode ? <><label style={{ fontSize: "small", fontWeight: "normal" }}>Price</label><br></br><input type="text" className="form-control mw-180" ref={detailsPrice} defaultValue={vehicleData !== null ? vehicleData.price : ''} placeholder="Price" /></> : <>$ {vehicleData !== null ? vehicleData.price : 'N/A'}</>}</span>
                  {!isEditMode && (vehicleData.inspection_status === "completed") && <> <i className="bi bi-patch-check-fill text-success me-1" /> AutoAssured </>}
                </div>
                <div className="">
                  <p className="small">
                    {isEditMode && (
                      <><label style={{ fontSize: "small", fontWeight: "normal" }}>Description</label>
                        <button className="ai-button" onClick={handleGenerateDescription}>
                          <i className="bi bi-magic"></i>
                          <span className="tooltip-text">Write your description using AI</span>
                        </button><br></br>
                        <textarea
                          rows="4"
                          id="descriptionTextarea"
                          className="form-control"
                          ref={detailsDescription}
                          defaultValue={vehicleData !== null ? vehicleData.description : ''}
                          placeholder="Description"
                          readOnly={useAxiosDescription}
                        />
                      </>
                    )}
                  </p>
                  {!isEditMode ? <>
                    <p className="fw-bold mb-2 small">Vehicle Highlights</p>
                    <ul className="small">
                      <li><b>Brand:</b> {vehicleData.brand}</li>
                      <li><b>Model:</b> {vehicleData.model}</li>
                      <li><b>Year:</b> {vehicleData.yom}</li>
                    </ul>
                    <details>
                      <summary className="fw-bold mb-2 small">Contact Details</summary>
                      <ul className="small">
                        <li><b>Seller Name:</b> {vehicleData.seller_id && vehicleData.seller_id.name ? toTitleCase(vehicleData.seller_id.name) : "N/A"}</li>
                        <li><b>Email:</b> {vehicleData.seller_id && vehicleData.seller_id.email ? (vehicleData.seller_id.email).toLowerCase() : "N/A"}</li>
                        <li><b>Address:</b> {toTitleCase(vehicleData.address)}{vehicleData !== null && ", " + vehicleData.state + " (" + vehicleData.postal_code + ")"}</li>
                      </ul>
                    </details>
                  </> : <>
                    <br></br>
                    <div className="row col-md-12">
                      <div className="col-md-4">
                        <label style={{ fontSize: "small", fontWeight: "normal" }}>Address</label><br></br>
                        <input onChange={handleAddressChange} className="form-control mw-180" type="text" ref={detailsAddress} defaultValue={vehicleData !== null ? vehicleData.address : ''} id="detailsAddress" placeholder="Address" />
                        {suggestions.length > 0 && (
                          <ul className="suggestions">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.properties.address_line1}, {suggestion.properties.address_line2}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label style={{ fontSize: "small", fontWeight: "normal" }}>State</label><br></br>
                        <input className="form-control mw-180" type="text" ref={detailsState} defaultValue={vehicleData !== null ? vehicleData.state : ''} id="detailsState" placeholder="State" />
                      </div>
                      <div className="col-md-4">
                        <label style={{ fontSize: "small", fontWeight: "normal" }}>Postal Code</label><br></br>
                        <input className="form-control mw-180" type="text" ref={detailsPostalCode} defaultValue={vehicleData !== null ? vehicleData.postal_code : ''} id="detailsPostalCode" placeholder="Postal Code" />
                      </div>
                    </div>
                    <br></br>
                  </>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-link active"
                      id="nav-details-tab"
                      data-bs-toggle="tab"
                      href="#nav-details"
                      role="tab"
                      aria-controls="nav-details"
                      aria-selected="true"
                    >
                      Vehicle Details
                    </a>
                    <a
                      className="nav-link"
                      id="nav-ship-returns-tab"
                      data-bs-toggle="tab"
                      href="#nav-ship-returns"
                      role="tab"
                      aria-controls="nav-ship-returns"
                      aria-selected="false"
                    >
                      {isEditMode ? (vehicleData && (vehicleData.inspection_status === 'completed' || vehicleData.inspection_status === 'accepted') ? "Our Assurance" : "Book Inspection") : ("Our Assurance")}
                    </a>
                    {!isEditMode ? <>
                      <a
                        className="nav-link"
                        id="nav-faq-tab"
                        data-bs-toggle="tab"
                        href="#nav-faq"
                        role="tab"
                        aria-controls="nav-faq"
                        aria-selected="false"
                      >
                        Questions and Answers
                      </a>
                    </> : <>
                      <a
                        className="nav-link"
                        id="nav-randr-tab"
                        data-bs-toggle="tab"
                        href="#nav-randr"
                        role="tab"
                        aria-controls="nav-randr"
                        aria-selected="false"
                      >
                        T & C
                      </a>
                    </>}
                  </div>
                </nav>
                <div className="tab-content p-3 small" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-details"
                    role="tabpanel"
                    aria-labelledby="nav-details-tab"
                  >
                    <Details isEditMode={isEditMode ? (vehicleData && (vehicleData.inspection_status === 'completed' || vehicleData.inspection_status === 'accepted') ? false : isEditMode) : (isEditMode)} vehicleData={vehicleData} ref={detailsRef} />
                  </div>
                  {isEditMode ? <>
                    <div
                      className="tab-pane fade"
                      id="nav-randr"
                      role="tabpanel"
                      aria-labelledby="nav-randr-tab"
                    >
                      <TermsConditions />
                    </div>
                  </> : <>
                    <div
                      className="tab-pane fade"
                      id="nav-faq"
                      role="tabpanel"
                      aria-labelledby="nav-faq-tab"
                    >
                      <dl>
                        {Array.from({ length: 5 }, (_, key) => (
                          <QuestionAnswer key={key} />
                        ))}
                      </dl>
                    </div>
                  </>}
                  <div
                    className="tab-pane fade"
                    id="nav-ship-returns"
                    role="tabpanel"
                    aria-labelledby="nav-ship-returns-tab"
                  >
                    <OurAssurance isEditMode={isEditMode ? (vehicleData && (vehicleData.inspection_status === 'completed' || vehicleData.inspection_status === 'accepted') ? false : isEditMode) : (isEditMode)} vehicleData={vehicleData} ref={inspectionRef} userRole={sessionData ? sessionData.role : ''} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-size-chart"
                    role="tabpanel"
                    aria-labelledby="nav-size-chart-tab"
                  >
                    <SizeChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <CardFeaturedProduct data={data.products} />
            <CardServices />
          </div>
        </div>
      </> : <>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default ProductDetailView;
