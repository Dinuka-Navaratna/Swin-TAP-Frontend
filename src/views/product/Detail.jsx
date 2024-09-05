import { lazy, useRef, useState } from "react";
import { data } from "../../data";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));


const ProductDetailView = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const detailsRef = useRef(null);

  const handleEditClick = () => {
    setIsEditMode(true);
    if (detailsRef.current) {
      alert(detailsRef.current.textContent);
    }
  };

  const handleSaveClick = () => {
    alert('Saving changes...');
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    alert('Cancelling edit mode...');
    setIsEditMode(false);
  };

  return (
    <div className="container-fluid mt-3">
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
              <h1 className="h5 d-inline me-2">{isEditMode ? <input type="text" defaultValue="" Placeholder="Advertisement Title"/> : "Advertisement Title"}</h1>
              {!isEditMode && (
                <>
                  <span className="badge bg-success me-2">New</span>
                  <span className="badge bg-danger me-2">Hot</span>
                </>
              )}
              {isEditMode && <span className="badge bg-dark me-2 float-right" onClick={handleCancelClick}>Cancel</span> }
              <span className="badge bg-primary me-2 float-right" onClick={isEditMode ? handleSaveClick : handleEditClick}>{isEditMode ? 'Save' : 'Edit'}</span>
              <div className="mb-3">
                <br></br>
                <span className="fw-bold h5 me-2">${isEditMode ? <input type="text" defaultValue="1900" Placeholder="Price" /> : "1900"}</span>
                {!isEditMode && <> <i className="bi bi-patch-check-fill text-success me-1" /> AutoAssured </> }
              </div>
              <div>
                <p>{isEditMode ? <textarea defaultValue="Description" Placeholder="Description" /> : "Description"}</p>
                {!isEditMode && <>
                <p className="fw-bold mb-2 small">Vehicle Highlights</p>
                <ul className="small">
                  <li>Brand: </li>
                  <li>Model: </li>
                  <li>Year: </li>
                </ul>
                <details>
                  <summary className="fw-bold mb-2 small">Contact Details</summary>
                  <ul className="small">
                    <li>Seller Name: </li>
                    <li>Phone No: </li>
                    <li>Address: </li>
                  </ul>
                </details>
                </> }
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
                    Our Assurance
                  </a>
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
                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  <Details ref={detailsRef} isEditMode={isEditMode} description="Your dynamic text here" />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  {Array.from({ length: 5 }, (_, key) => (
                    <RatingsReviews key={key} />
                  ))}
                </div>
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
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
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
    </div>
  );
};

export default ProductDetailView;
