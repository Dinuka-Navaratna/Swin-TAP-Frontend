import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSession, clearSession } from "../actions/session";
import { confirmDialog, warningDialog, successDialog } from "../helpers/alerts.js"; // Import SweetAlert2 dialogs

const Header = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionData = getSession();
    if (sessionData) {
      setSession(sessionData);
    }
  }, []);

  const handleLogout = () => {
    // Replace window.confirm with confirmDialog
    confirmDialog("Are you sure you want to log out?")
      .then((result) => {
        if (result.isConfirmed) { // If user clicks "OK"
          clearSession();
          setSession(null);
          window.location.reload();
        } else {
          warningDialog("That's what I thought, you dummy!\nThink twice before clicking!");
        }
      })
      .catch((error) => {
        console.error("Error displaying the confirmation dialog:", error);
      });
  };

  return (
    <header className="p-3 border-bottom bg-light">
      <div className="container-fluid">
        <div className="row g-3">
          <div className="col-md-3 text-center">
            <Link to="/">
              <img alt="logo" src="../../images/logo.webp" />
            </Link>
          </div>
          <div className="col-md-6 navbar navbar-expand-lg navbar-light bg-light p-0">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listing/">
                    Vehicle Listing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/assurance">
                    Our Assurance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="about-us">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    T & C
                  </Link>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary rounded-circle border me-3"
                data-toggle="dropdown"
                aria-expanded="false"
                aria-label="Profile"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-fill text-light"></i>
              </button>
              <ul className="dropdown-menu">
                {session ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account/profile">
                        <i className="bi bi-person-square"></i>&nbsp;
                        My Profile
                      </Link>
                    </li>
                    {session.role === "seller" ? (
                      <li>
                        <Link className="dropdown-item" to="/account/ads">
                          <i className="bi bi-star-fill text-warning"></i>&nbsp;
                          My Ads
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link className="dropdown-item" to="/account/inspections">
                          <i className="bi bi-list-check text-primary"></i>&nbsp;
                          My Inspections
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/support">
                        <i className="bi bi-info-circle-fill text-success"></i>&nbsp;
                        Support
                      </Link>
                    </li>
                    {session.role === "seller" && (
                      <li>
                        <Link className="dropdown-item" to="/listing/new">
                          <i className="bi bi-plus-circle-fill text-primary"></i>&nbsp;
                          Post Ad
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-in-left text-danger"></i>&nbsp;
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account/signin">
                        <i className="bi bi-box-arrow-in-right text-primary"></i>&nbsp;
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/signup">
                        <i className="bi bi-person-check text-success"></i>&nbsp;
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
