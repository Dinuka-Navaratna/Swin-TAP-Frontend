import React from "react";
import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import "./admin.css";

const AdminPanel = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row d-flex justify-content-center p-0 m-0">
          <div className="col-4 d-flex flex-column align-items-center p-0 m-0">
            <Link
              to="/admin/user-management"
              className="text-decoration-none m-0 p-5 align-items-center d-flex flex-column"
            >
              <img
                src="../../images/category/user-management.png"
                className="img-fluid"
                alt="..."
              />
              <div className="text-center mt-2">User Management</div>
            </Link>
          </div>
          <div className="col-4 d-flex flex-column align-items-center p-0 m-0 align-items-center">
            <Link
              to="/admin/mechanic-management"
              className="text-decoration-none m-0 p-5 align-items-center d-flex flex-column"
            >
              <img
                src="../../images/category/mechanic-management.png"
                className="img-fluid"
                alt="..."
              />
              <div className="text-center mt-2">Mechanic Management</div>
            </Link>
          </div>
          {/* <div className="col-4 d-flex flex-column align-items-center p-0 m-0">
            <Link
              to="/"
              className="text-decoration-none m-0 p-5 align-items-center d-flex flex-column"
            >
              <img
                src="../../images/category/vehicle-management.png"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center mt-2">Advertisement Management</div>
            </Link>
          </div> */}
        </div>
      </div>
      <Analytics />
    </>
  );
};

export default AdminPanel;
