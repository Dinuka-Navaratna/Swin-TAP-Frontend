import { Link } from "react-router-dom";
import { toTitleCase } from '../../helpers/letterCaseChange'

const isNewHot = (dateString, daysGap) => {
  const givenDate = new Date(dateString);
  const today = new Date();
  const timeDifference = givenDate.getTime() - today.getTime();
  const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24));
  return dayDifference < daysGap && dayDifference >= 0;
};

const CardProductList = (props) => {
  const ads = props.data;
  const role = props.role;
  const files = (ads.files).length;
  return (
    <Link to={"/listing/" + ads._id} className="text-decoration-none">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-3 text-center">
            <img style={{ maxHeight: "250px" }} src={files !== 0 ? `${process.env.REACT_APP_API_URL}/uploads/300x300/${ads.files[0].new_filename}` : "../../images/products/vehicle.jpg"} className="card-img-top" alt="..." />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h6 className="card-subtitle me-2 d-inline" style={{ color: "#0d6efd" }}>
                {toTitleCase(ads.title)}
              </h6>
              {isNewHot(ads.created_at, 5) && (
                <span className="badge bg-success me-2">New</span>
              )}
              {/* {isNewHot(ads.created_at, 1) && (
              <span className="badge bg-danger me-2">Hot</span>
            )} */}
              {role === "mechanic" && ads.inspection_status === "requested" &&
                <>
                  <span className="badge bg-danger me-2">
                    Inspection Requested
                  </span>
                </>
              }

              <div className="mt-2">
                <span className="fw-bold h5">${ads.price}</span>
                {/* {0 > 0 && (
                <del className="small text-muted ms-2">${0}</del>
              )} */}
                <span className="ms-2">
                  {ads.inspection_status === "completed" ? (
                    <>
                      <i className="bi bi-patch-check-fill text-success me-1" />
                      AutoAssured
                    </>
                  ) : (
                    Array.from({ length: ads.star }, (_, key) => (
                      <i className="bi bi-star-fill text-warning me-1" key={key} />
                    ))
                  )}
                </span>
              </div>
              <p className="small mt-2">
                <b>Brand:</b> {ads.brand} <br></br>
                <b>Model:</b> {toTitleCase(ads.model)} <br></br>
                <b>Year:</b> {ads.yom} <br></br>
                <b>Postal Code:</b> {ads.postal_code}
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-body">
              <div className="mb-2">
                {/* <span className="fw-bold h5">${product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ms-2">${product.originPrice}</del>
              )}
              <span className="ms-2">
                {product.star === 1 ? (
                  <>
                    <i className="bi bi-patch-check-fill text-success me-1" />
                    AutoAssured
                  </>
                ) : (
                  Array.from({ length: product.star }, (_, key) => (
                    <i className="bi bi-star-fill text-warning me-1" key={key} />
                  ))
                )}
              </span> */}
              </div>
              {/* {product.isFreeShipping && (
              <p className="text-success small mb-2">
                <i className="bi bi-truck" /> Free shipping
              </p>
            )} */}

              {/* <div className="btn-group d-flex" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
              >
                <i className="bi bi-cart-plus" />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Add to wishlist"
              >
                <i className="bi bi-heart-fill" />
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProductList;
