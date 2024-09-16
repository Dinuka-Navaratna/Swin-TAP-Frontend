import React, { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { toTitleCase } from '../../helpers/letterCaseChange'
import { vehicleBrands } from '../../data/vehicleBrands';
import { vehicleModels } from '../../data/vehicleModels';

const Details = forwardRef((props, ref) => {
  const { isEditMode, vehicleData } = props;
  // eslint-disable-next-line no-unused-vars
  const [selectedBrand, setSelectedBrand] = useState(vehicleData ? vehicleData.brand || '' : '');
  const [models, setModels] = useState(vehicleModels[vehicleData ? vehicleData.brand || '' : ''] || []);
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

  // const toTitleCase = (str) => {
  //   return str.replace(/\w\S*/g, (txt) => {
  //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //   });
  // };

  useImperativeHandle(ref, () => ({
    getDetails: () => {
      return {
        brand: detailsBrand.current.value,
        model: detailsModel.current.value,
        yom: detailsYear.current.value,
        transmission: detailsTransmission.current.value,
        mileage: detailsMileage.current.value,
        fuel_type: detailsFuel.current.value,
        color: detailsColor.current.value,
        body_type: detailsType.current.value,
        condition: detailsCondition.current.value,
      };
    }
  }));

  return (
    <React.Fragment>
      {!isEditMode && <>
        <p>
          {vehicleData.description}
        </p>
        <hr />
      </>}
      <div className="col-md-7">
        <dt>Specifications</dt>
        <br></br>
        {<dl className="row small mb-3">
          <dt id="details-brand" ref={ref} className="col-sm-3">Brand</dt>
          <dd className="col-sm-9">
            {isEditMode ? <select ref={detailsBrand} onChange={handleBrandChange} defaultValue={vehicleData ? vehicleData.brand : "" }>
              <option value="" disabled>Select a Brand</option>
              {vehicleBrands.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select> : toTitleCase(vehicleData.brand)}
          </dd>
          <dt className="col-sm-3">Model</dt>
          <dd className="col-sm-9">
            {isEditMode ? <select ref={detailsModel} defaultValue={vehicleData ? vehicleData.model : "" }>
              <option value="" disabled>Select a Model</option>
              {models.map((model, index) => (
                  <option key={index} value={model}>{model}</option>
              ))}
            </select> : toTitleCase(vehicleData.model)}</dd>
          <dt className="col-sm-3">Year</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsYear} defaultValue={vehicleData ? vehicleData.yom : "" }>
            {getYears().map((year, index) => (
                <option key={index} value={year}>{year}</option>
            ))}
          </select> : vehicleData.yom}</dd>
          <dt className="col-sm-3">Transmission</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsTransmission} defaultValue={vehicleData ? vehicleData.transmission : "" }>
            <option value="" disabled>Select Transmission Type</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Other">Other</option>
          </select> : toTitleCase(vehicleData.transmission)}</dd>
          <dt className="col-sm-3">Mileage</dt>
          <dd className="col-sm-9">{isEditMode ? <input type="number" defaultValue={vehicleData !== null ? vehicleData.mileage : ''} placeholder="0" ref={detailsMileage} /> : vehicleData.mileage + " Km"}</dd>
          <dt className="col-sm-3">Fuel Type</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsFuel} defaultValue={vehicleData && vehicleData.fuel_type.toLowerCase()}>
            <option value="" disabled>Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
            <option value="Other">Other</option>
          </select> : toTitleCase(vehicleData.fuel_type)}</dd>
          <dt className="col-sm-3">Color</dt>
          <dd className="col-sm-9">{isEditMode ? <input type="text" defaultValue={vehicleData !== null ? toTitleCase(vehicleData.color) : ''} placeholder="Color" ref={detailsColor} /> : toTitleCase(vehicleData.color)}</dd>
          <dt className="col-sm-3">Body Type</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsType} defaultValue={vehicleData && vehicleData.body_type.toLowerCase()}>
            <option value="" disabled>Select Body Type</option>
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
          </select> : toTitleCase(vehicleData.body_type)}</dd>
          <dt className="col-sm-3">Condition</dt>
          <dd className="col-sm-9">{isEditMode ? <select ref={detailsCondition} defaultValue={vehicleData && vehicleData.condition.toLowerCase()}>
            <option value="" disabled>Select Condition</option>
            <option>Brand New</option><option>Used</option><option>Reconditioned</option>
          </select> : toTitleCase(vehicleData.condition)}</dd>
        </dl>}
      </div>
      <hr />

      {!isEditMode && (
        <p><b>Advertised on:</b> {new Date(vehicleData.created_at).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      )}
    </React.Fragment>
  );
});

export default Details;
