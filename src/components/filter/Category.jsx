import React from "react";
import { Link } from "react-router-dom";

const FilterCategory = (props) => {
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Sedans
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            SUVs
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Trucks
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Motorcycles
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Electric Vehicles
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Convertibles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FilterCategory;
