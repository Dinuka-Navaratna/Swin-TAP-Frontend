import { lazy, useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { data } from "../../data";
import { getSession } from "../../actions/session";
import axios from "axios";
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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const detailsRef = useRef(null);
  
  useEffect(() => {
    const session = getSession();
    if (session) {
      setSessionData(session);
      console.log(session._id);
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
            // console.log(JSON.stringify(response.data));
            if (response.data.status === false) {
              alert("Invalid ad ID");
              window.location.href = "/listing";
            } else {
              setVehicleData(response.data.data);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (session) {
          setIsEditMode(true);
          setIsLoading(false);
        } else {
          alert("Log in to post a new ad");
          window.location.href = "/account/signin";
        }
      }
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = (details) => {
    alert('Saving changes...');
    setIsEditMode(false);
    if (detailsRef.current) {
      const details = detailsRef.current.getDetails();
      alert(`Brand: ${details.brand}`); // Check if brand is defined
    }
  };

  const handleCancelClick = () => {
    alert('Cancelling edit mode...');
    setIsEditMode(false);
  };

  return (
    <div className="container-fluid mt-3">
      {!isLoading && <>
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <img
                  src="../../images/products/vehicle.jpg"
                  className="img-fluid mb-3"
                  alt=""
                />
                <img
                  src="../../images/products/vehicle.jpg"
                  className="border border-secondary me-2"
                  width="75"
                  alt="..."
                />
                <img
                  src="../../images/products/vehicle.jpg"
                  className="border border-secondary me-2"
                  width="75"
                  alt="..."
                />
                <img
                  src="../../images/products/vehicle.jpg"
                  className="border border-secondary me-2"
                  width="75"
                  alt="..."
                />
              </div>
              <div className="col-md-7">
                <br></br>
                <h1 className="h5 d-inline me-2">{isEditMode ? <input type="text" defaultValue={vehicleData !== null ? vehicleData.title : ''} /> : vehicleData.title}</h1>
                {!isEditMode && (
                  <>
                    <span className="badge bg-success me-2">New</span>
                    <span className="badge bg-danger me-2">Hot</span>
                  </>
                )}
                {sessionData && sessionData._id === vehicleData.seller_id._id && <>
                  {isEditMode && <span className="badge bg-dark me-2 float-right" onClick={handleCancelClick}>Cancel</span>}
                  <span className="badge bg-primary me-2 float-right" onClick={isEditMode ? handleSaveClick : handleEditClick}>{isEditMode ? 'Save' : 'Edit'}</span>
                </>}
                <div className="mb-3">
                  <br></br>
                  <span className="fw-bold h5 me-2">${isEditMode ? <input type="text" defaultValue={vehicleData !== null ? vehicleData.price : ''} Placeholder="Price" /> : vehicleData.price}</span>
                  {!isEditMode && <> <i className="bi bi-patch-check-fill text-success me-1" /> AutoAssured </>}
                </div>
                <div>
                  <p>{isEditMode ? <textarea defaultValue={vehicleData !== null ? vehicleData.description : ''} Placeholder="Description" /> : vehicleData.description}</p>
                  {!isEditMode && <>
                    <p className="fw-bold mb-2 small">Vehicle Highlights</p>
                    <ul className="small">
                      <li><b>Brand:</b> {vehicleData.brand}</li>
                      <li><b>Model:</b> {vehicleData.model}</li>
                      <li><b>Year:</b> {vehicleData.yom}</li>
                    </ul>
                    <details>
                      <summary className="fw-bold mb-2 small">Contact Details</summary>
                      <ul className="small">
                        <li><b>Seller Name:</b> {vehicleData.seller_id.name}</li>
                        <li><b>Email:</b> {vehicleData.seller_id.email}</li>
                        <li><b>Address:</b> N/A</li>
                      </ul>
                    </details>
                  </>}
                </div>

                {/* <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                    >
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="1"
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  title="Add to cart"
                >
                  <i className="bi bi-cart-plus me-1"></i>Add to cart
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-warning me-2"
                  title="Buy now"
                >
                  <i className="bi bi-cart3 me-1"></i>Buy now
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
              </div> */}

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
                      {isEditMode ? "Book Inspection" : "Our Assurance"}
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
                    <Details isEditMode={isEditMode} vehicleData={vehicleData} ref={detailsRef} />
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
                    <OurAssurance isEditMode={isEditMode} id={id} vehicleData={vehicleData} />
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
      </>}
    </div>
  );
};

export default ProductDetailView;
