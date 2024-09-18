import React, { lazy } from "react";
import { Link } from "react-router-dom";
const Line = lazy(() => import("../others/Line"));

const Tags = (props) => {
  return (
    <div className={`mb-4 px-4 ${props.className ? props.className : ""}`}>
      <h4 className="fst-italic">{props.title}</h4>
      <Line className="mb-2" />
      <Link to="/" className="btn btn-sm btn-outline-info me-2 mb-2">
        Toyota
      </Link>
      <Link to="/" className="btn btn-sm btn-outline-secondary me-2 mb-2">
        Nissan
      </Link>
      <Link to="/" className="btn btn-sm btn-outline-success me-2 mb-2">
        Honda
      </Link>
      <Link to="/" className="btn btn-sm btn-outline-danger me-2 mb-2">
        Ford
      </Link>
      <Link to="/" className="btn btn-sm btn-outline-dark me-2 mb-2">
        BMW
      </Link>
      <Link to="/" className="btn btn-sm btn-outline-primary me-2 mb-2">
        Mercedes-Benz
      </Link>
      <Link to="/" className="btn btn-sm btn-outline-warning me-2 mb-2">
        Audi
      </Link>
    </div>
  );
};
export default Tags;
