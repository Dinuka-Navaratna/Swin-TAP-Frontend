import React, { useState } from "react";

const FilterTag = ({ getProducts }) => {
  const [activeBrand, setActiveBrand] = useState('');

  const handleBrandClick = (brand) => {
    if (brand === "Clear") {
      setActiveBrand("");
      getProducts(1, 'clear', '', '', '');
    } else {
      setActiveBrand(brand);
      getProducts(1, brand, '', '', '');
    }
  };

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
        {['Toyota', 'Nissan', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi'].map((brand, index) => (
          <button
            key={brand}
            className={`btn btn-sm me-2 mb-2 ${activeBrand === brand ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => handleBrandClick(brand)}
          >
            {brand}
          </button>
        ))}
        <button
            className={`btn btn-sm me-2 mb-2`} style={{padding: '0px', textDecoration: 'underline'}}
            onClick={() => handleBrandClick("Clear")}
          >
            Clear Filter
          </button>
      </div>
    </div>
  );
};

export default FilterTag;
