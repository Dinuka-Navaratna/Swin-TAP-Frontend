import React from "react";

const FilterPrice = (props) => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              $0 - $5000 <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault2"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              $5000 - $10,000 <span className="text-muted">(2)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault3"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              $10,000 - $20,000 <span className="text-muted">(5)</span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterPrice;
