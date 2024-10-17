import React from "react";

const CardListForm = () => {
  return (
    <div className="card border-primary">
      <h6 className="card-header">
        <i className="bi bi-credit-card-2-front-fill text-primary"></i> Verification Documents
        <button className="btn btn-sm btn-primary float-end">
          <i className="bi bi-plus-lg text-light"></i>
        </button>
      </h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <i className="bi bi-file-earmark-check"></i> Document name
          <button type="button" className="btn btn-sm ms-3">
            <i className="bi bi-trash"></i>
          </button>
        </li>
        <li className="list-group-item bg-primary text-white">
          <i className="bi bi-upload"></i> Upload documents {" "}
          <button type="button" className="btn btn-sm btn-light ms-3">
            Submit
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CardListForm;
