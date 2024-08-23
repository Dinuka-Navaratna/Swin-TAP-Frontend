import { Link } from "react-router-dom";

const CardProductList = (props) => {
  const product = props.data;
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.img} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={product.link} className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success me-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger me-2">Hot</span>}

            <div>
              <span className="fw-bold h5">${product.price}</span>
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
              </span>
            </div>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{product.description}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
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
            {product.isFreeShipping && (
              <p className="text-success small mb-2">
                <i className="bi bi-truck" /> Free shipping
              </p>
            )}

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
  );
};

export default CardProductList;
