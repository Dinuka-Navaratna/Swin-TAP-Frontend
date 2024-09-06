import React, { useState, forwardRef, useRef } from "react";
import { vehicleBrands } from '../../data/vehicleBrands';
import { vehicleModels } from '../../data/vehicleModels';

const Details = forwardRef((props, ref) => {
  const { isEditMode } = props;
  // eslint-disable-next-line no-unused-vars
  const [selectedBrand, setSelectedBrand] = useState('');
  const [models, setModels] = useState([]);
  const detailsBrand = useRef(null);
  const detailsModel = useRef(null);
  const detailsYear = useRef(null);
  const detailsTransmission = useRef(null);
  const detailsMileage = useRef(null);
  const detailsFuel = useRef(null);
  const detailsColor = useRef(null);
  const detailsType = useRef(null);
  const detailsCondition = useRef(null);

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    setModels(vehicleModels[selectedBrand] || []);
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; 1990 <= year; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <React.Fragment>
      <p>
      {!isEditMode && <> {props.description})
      <hr />
      </> }
      </p>
      <div className="col-md-7">
        <dt>Specifications</dt>
        <br></br>
        {<dl className="row small mb-3">
          <dt id="details-brand" ref={ref} className="col-sm-3">Brand</dt>
          <dd className="col-sm-9">
            {isEditMode ? <select ref={detailsBrand} onChange={handleBrandChange}>
              <option selected disabled>Select a Brand</option>
              {vehicleBrands.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select> : "N/A"}
          </dd>
          <dt className="col-sm-3">Model</dt>
          <dd className="col-sm-9">
            {isEditMode ? <select ref={detailsModel}>
              <option selected disabled>Select a Model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select> : "N/A"}</dd>
          <dt className="col-sm-3">Year</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsYear}>
            {getYears().map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select> : "N/A"}</dd>
          <dt className="col-sm-3">Transmission</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsTransmission}>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Other">Other</option>
          </select> : "N/A"}</dd>
          <dt className="col-sm-3">Mileage</dt>
          <dd className="col-sm-9">{isEditMode ? <input type="text" defaultValue="N/A" Placeholder="Brand" ref={detailsMileage} /> : "N/A"}</dd>
          <dt className="col-sm-3">Fuel Type</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsFuel}>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
            <option value="Other">Other</option>
          </select> : "N/A"}</dd>
          <dt className="col-sm-3">Color</dt>
          <dd className="col-sm-9">{isEditMode ? <input type="text" defaultValue="N/A" Placeholder="Brand" ref={detailsColor} /> : "N/A"}</dd>
          <dt className="col-sm-3">Body Type</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsType}>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
            <option value="Minivan">Minivan</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Supercar">Supercar</option>
            <option value="Other">Other</option>
          </select> : "N/A"}</dd>
          <dt className="col-sm-3">Condition</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsCondition}>
            <option>Brand New</option><option>Used</option><option>Reconditioned</option>
          </select> : "N/A"}</dd>
        </dl>}
      </div>
      <hr />

      {!isEditMode && <p>Advertised on: </p> }
    </React.Fragment>
  );
});

export default Details;
