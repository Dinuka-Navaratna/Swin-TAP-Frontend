import React from "react";
import { Link } from "react-router-dom";

const FilterTag = (props) => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterTag"
        aria-expanded="true"
        aria-controls="filterTag"
      >
        Vehicle Brands
      </div>
      <div className="card-body show" id="filterTag">
        <Link to="/" className="btn btn-sm btn-outline-info me-2 mb-2">
          Toyota
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-secondary me-2 mb-2">
          Nissan
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-success me-2 mb-2">
          Honda
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-danger me-2 mb-2">
          Ford
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-dark me-2 mb-2">
          BMW
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-primary me-2 mb-2">
          Mercedes-Benz
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-warning me-2 mb-2">
          Audi
        </Link>
      </div>
    </div>
  );
};

export default FilterTag;
