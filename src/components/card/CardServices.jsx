import React from "react";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconLifePreserverFill } from "bootstrap-icons/icons/life-preserver.svg";
import { ReactComponent as IconArrowCounterclockwiseFill } from "bootstrap-icons/icons/arrow-counterclockwise.svg";

const CardServices = (props) => {
  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">
        Why AutoAssure?
      </div>
      <div className="card-body">
        <div className="row border-bottom">
          <div className="col-2">
            <IconTruckFill width={40} height={40} />
          </div>
          <div className="col">
            <div className="ms-3">
              <span className="fw-bold">Assured vehicles</span>
              <p className="text-muted small">Mechanically verified vehicles</p>
            </div>
          </div>
        </div>
        <div className="row border-bottom py-3">
          <div className="col-2">
            <IconLifePreserverFill width={40} height={40} />
          </div>
          <div className="col">
            <div className="ms-3">
              <span className="fw-bold">Support 24/7</span>
              <p className="text-muted small m-0">Online 24 hours</p>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-2">
            <IconArrowCounterclockwiseFill width={40} height={40} />
          </div>
          <div className="col">
            <div className="ms-3">
              <span className="fw-bold">On-going Maintenance</span>
              <p className="text-muted small m-0">No need to worry about vehicle maintenance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardServices;
