import React, { forwardRef, useRef, useImperativeHandle, useReducer } from "react";

const ShippingReturns = forwardRef((props, ref) => {
  const { isEditMode } = props;
  const { vehicleData } = props;
  const { userRole } = props;
  const inspectionPostCode = useRef(null);
  const inspectionDate = useRef(null);
  const inspectionRego = useRef(null);
  var additionalServices = useRef([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const getInspectionStatusMessage = (status) => {
    if (status === 'completed') {
      return (
        <>
          Completed - <a href="https://dinuka.site" target="_blank" rel="noopener noreferrer">Click here to view the report</a>
        </>
      );
    } else if (status === 'requested') {
      return ('An inspection has been requested by the seller and awaiting mechanic response.')
    } else if (status === 'not_requested') {
      return 'The seller has not requested for an inspection.';
    } else if (status === 'assigned') {
      return 'The inspection has been scheduled with a mechanic.';
    } else {
      return 'Inspection details not available.';
    }
  };

  useImperativeHandle(ref, () => ({
    getDetails: () => {
      return {
        // inspectionPostCode: inspectionPostCode.current.value,
        inspectionDate: inspectionDate.current.value,
        inspectionRego: inspectionRego.current.value,
      };
    }
  }));

  const addAdditionalServices = (serviceID) => {
    const index = additionalServices.current.indexOf(serviceID);
    if (index > -1) {
      additionalServices.current.splice(index, 1);
    } else {
      additionalServices.current.push(serviceID);
    }
    forceUpdate();
    console.log(additionalServices.current);
  };

  return (
    <React.Fragment>
      {isEditMode ? <>
        <p className="fw-bold mb-2">Pick a date to book for an inspection +</p>
        <br></br>
        <div className="row col-md-12">
          {/* <div className="col-md-3">
            <label htmlFor="postalCode">Postal Code*</label><br></br>
            <input type="text" ref={inspectionPostCode} id="postalCode" placeholder="Postal Code" />
          </div> */}
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
        <hr />
        <p className="fw-bold mb-2">Additional Services +</p>
        <ul>
          <li>RWC Certification <span className="badge bg-dark me-2" onClick={() => addAdditionalServices(1)}>{additionalServices.current.includes(1) ? 'Added' : 'Add'}</span></li>
          <li>Rego Renewal <span className="badge bg-dark me-2" onClick={() => addAdditionalServices(2)}>{additionalServices.current.includes(2) ? 'Added' : 'Add'}</span></li>
        </ul>
      </> : <>
        <b>Inspection status:</b> {getInspectionStatusMessage(vehicleData.inspection_report && vehicleData.inspection_report.status ? vehicleData.inspection_report.status : vehicleData.inspection_status)}<br />
        {userRole === "mechanic" &&
          <ul className="small mt-2">
            <li><b>Date:</b> {vehicleData.inspection_report.inspection_time}</li>
            <li><b>Rego:</b> {vehicleData.inspection_report.vehicle_rego}</li>
            {(vehicleData.inspection_report.additional_requests).length !== 0 &&
              <>
                <details>
                  <summary className="fw-bold mb-2 small">Additional Services:</summary>
                  <ul className="small">
                    {vehicleData.inspection_report.additional_requests.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </details>
              </>
            }
          </ul>
        }
      </>}
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
