import React, { forwardRef, useRef } from "react";

const ShippingReturns = forwardRef((props, ref) => {
  const { isEditMode, id } = props;

  return (
    <React.Fragment>
      {isEditMode ? <>
        <br></br>
        <div className="row col-md-12">
          <div className="col-md-3">
            <label htmlFor="postalCode">Postal Code*</label><br></br>
            <input type="text" id="postalCode" placeholder="Postal Code" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inspectionDate">Inspection Date*</label><br></br>
            <input type="date" id="inspectionDate" placeholder="Inspection Date" />
          </div>
          <div className="col-md-3">
            <label htmlFor="vehicleRego">Vehicle Rego</label><br></br>
            <input type="text" id="vehicleRego" placeholder="Vehicle Rego" />
          </div>
          {id !== "new" && (
            <div className="col-md-3">
              <br></br>
              <button>Book Inspection</button>
            </div>
          )}
        </div>
        <br></br><br></br><br></br>
      </> : <>This vehicle is not AutoAssured. Edit the advertisement to book for an inspection.<br></br><br></br></>}
      <p>! What are the benefits of being AutoAssured?</p>
      <ul>
        <li>Benefit Benefit Benefit Benefit Benefit </li>
        <li>Benefit Benefit Benefit Benefit Benefit </li>
        <li>Benefit Benefit Benefit Benefit Benefit </li>
        <li>Benefit Benefit Benefit Benefit Benefit </li>
        <li>Benefit Benefit Benefit Benefit Benefit </li>
      </ul>
    </React.Fragment>
  );
});

export default ShippingReturns;
