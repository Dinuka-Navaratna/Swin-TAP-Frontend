import { Link } from "react-router-dom";

const isNewHot = (dateString, daysGap) => {
  const givenDate = new Date(dateString);
  const today = new Date();
  const timeDifference = givenDate.getTime() - today.getTime();
  const dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24));
  return dayDifference < daysGap && dayDifference >= 0;
};

const CardProductGrid = (props) => {
  const ads = props.data;
  return (
    <Link to={"/listing/" + ads._id} className="text-decoration-none">
      <div className="card">
        <img src={"../../images/products/vehicle.jpg"} className="card-img-top" alt="..." />
        {isNewHot(ads.created_at, 5) && (
          <span className="badge bg-success position-absolute mt-2 ms-2">
            New
          </span>
        )}
        {isNewHot(ads.created_at, 1) && (
          <span className="badge bg-danger position-absolute r-0 mt-2 me-2">
            Hot
          </span>
        )}
        {(0 > 0 || 0 > 0) && (
          <span
            className={`rounded position-absolute p-2 bg-warning  ms-2 small ${isNewHot(ads.created_at, 5) ? "mt-5" : "mt-2"
              }`}
          >
            -
            {0 > 0
              ? 0 + "%"
              : "$" + 0}
          </span>
        )}
        <div className="card-body">
          <h6 className="card-subtitle mb-2">
            <p className="text-decoration-none" style={{color: "#0d6efd"}}>
              {ads.title}
            </p>
          </h6>
          <div className="my-2">
            <span className="fw-bold h5">${ads.price}</span>
            {ads.price > ads.price && (
              <del className="small text-muted ms-2">${ads.price}</del>
            )}
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
            <p className="small mt-2">{ads.description}</p>
            <p className="small mt-2">{ads.brand}</p>
            <p className="small mt-2">{ads.postal_code}</p>
          </div>
          {/* <div className="btn-group  d-flex" role="group">
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
    </Link>
  );
};

export default CardProductGrid;
