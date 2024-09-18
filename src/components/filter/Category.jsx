import React from "react";
import { Link } from "react-router-dom";

const FilterCategory = ({ getProducts, selectedBrand }) => {
  const handleTypeClick = (type) => {
    getProducts(1, '', type, '', '');
  };

  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Vehicle Type
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
        {['Sedans', 'SUVs', 'Trucks', 'Motorcycles', 'Electric Vehicles', 'Convertibles'].map((type, index) => (
          <li
            key={index}
            className={`list-group-item ${selectedBrand === type ? 'active fw-bold' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            <Link className="text-decoration-none stretched-link">
              {type}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
