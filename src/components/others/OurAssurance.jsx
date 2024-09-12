import React, { forwardRef, useRef, useImperativeHandle } from "react";

const ShippingReturns = forwardRef((props, ref) => {
  const { isEditMode } = props;
  const { vehicleData } = props;
  const inspectionPostCode = useRef(null);
  const inspectionDate = useRef(null);
  const inspectionRego = useRef(null);

  const getInspectionStatusMessage = (status) => {
    if (status === 'completed') {
      return (
        <>
          Completed - <a href="https://dinuka.site" target="_blank" rel="noopener noreferrer">Click here to view the report</a>
        </>
      );
    } else if (status === 'requested') {
      return 'An inspection has been requested by the seller and awaiting mechanic response.';
    } else if (status === 'not_requested') {
      return 'The seller has not requested for an inspection.';
    } else if (status === 'accepted') {
      return 'The inspection has been scheduled with a mechanic.';
    } else {
      return 'Inspection not available.';
    }
  };

  useImperativeHandle(ref, () => ({
    getDetails: () => {
      return {
        inspectionPostCode: inspectionPostCode.current.value,
        inspectionDate: inspectionDate.current.value,
        inspectionRego: inspectionRego.current.value,
      };
    }
  }));

  return (
    <React.Fragment>
      {isEditMode ? <>
        <br></br>
        <div className="row col-md-12">
          <div className="col-md-3">
            <label htmlFor="postalCode">Postal Code*</label><br></br>
            <input type="text" ref={inspectionPostCode} id="postalCode" placeholder="Postal Code" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inspectionDate">Inspection Date*</label><br></br>
            <input type="date" ref={inspectionDate} id="inspectionDate" placeholder="Inspection Date" />
          </div>
          <div className="col-md-3">
            <label htmlFor="vehicleRego">Vehicle Rego</label><br></br>
            <input type="text" ref={inspectionRego} id="vehicleRego" placeholder="Vehicle Rego" />
          </div>
        </div>
        <br />
      </> : <><b>Inspection status:</b> {getInspectionStatusMessage(vehicleData.inspection_status)}<br /></>}
      <hr />
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
