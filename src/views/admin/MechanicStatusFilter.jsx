import React, { useState } from "react";

const MechanicStatusFilter = ({ getUsers }) => {
  const [activeVerification, setActiveVerification] = useState("");

  const handleVerificationClick = (verification) => {
    if (verification === "Clear") {
      setActiveVerification("");
      getUsers(1, "clear", "", "");
    } else {
      setActiveVerification(verification);
      let mechanic_verification = "";
      if (verification === "Verified") {
        mechanic_verification = "verified";
      } else if (verification === "Not Verified") {
        mechanic_verification = "not_verified";
      }
      getUsers(1, mechanic_verification, "", "");
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
        Mechanic Status
      </div>
      <div className="card-body show" id="filterTag">
        {["Verified", "Not Verified"].map((verification, index) => (
          <button
            key={verification}
            className={`btn btn-sm me-2 mb-2 ${
              activeVerification === verification
                ? "btn-primary"
                : "btn-outline-dark"
            }`}
            onClick={() => handleVerificationClick(verification)}
          >
            {verification}
          </button>
        ))}
        <button
          className={`btn btn-sm me-2 mb-2`}
          style={{ padding: "0px", textDecoration: "underline" }}
          onClick={() => handleVerificationClick("Clear")}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default MechanicStatusFilter;
