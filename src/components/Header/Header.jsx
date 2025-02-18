import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSession, clearSession } from "../../actions/session.js";
import { confirmDialog } from "../../helpers/alerts.js";
import "./Header.css";

const Header = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionData = getSession();
    if (sessionData) {
      setSession(sessionData);
    }
  }, []);

  const handleLogout = () => {
    confirmDialog("Are you sure you want to log out?")
      .then((result) => {
        if (result.isConfirmed) {
          clearSession();
          setSession(null);
          window.location.reload();
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link " to="/">
                    <h6> Home </h6>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listing/">
                    <h6>Vehicle Listing</h6>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="about-us">
                    <h6>About Us</h6>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    <h6> Contact Us </h6>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/terms-condition">
                    <h6> T & C</h6>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <div
                className="clickable"
                data-toggle="dropdown"
                aria-expanded="false"
                aria-label="Profile"
                data-bs-toggle="dropdown"
              >
                <img
                  src="../../../images/navbar/user.png"
                  className="user-icon clickable"
                />
              </div>
              <ul className="dropdown-menu">
                {session ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account/profile">
                        <i className="bi bi-person-square"></i>&nbsp;&nbsp;
                        {session.name}
                      </Link>
                    </li>
                    {session.role === "seller" && (
                      <li>
                        <Link className="dropdown-item" to="/account/ads">
                          <i className="bi bi-star-fill text-warning"></i>&nbsp;
                          My Ads
                        </Link>
                      </li>
                    )}{" "}
                    {session.role === "mechanic" && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/account/inspections"
                        >
                          <i className="bi bi-list-check text-primary"></i>
                          &nbsp; My Inspections
                        </Link>
                      </li>
                    )}
                    {session.role === "admin" && (
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          <i className="bi bi-display text-primary"></i>
                          &nbsp; Admin Panel
                        </Link>
                      </li>
                    )}
                    {/* <li>
                      <Link className="dropdown-item" to="/account/wishlist">
                        <i className="bi bi-heart-fill text-danger"></i>&nbsp;
                        Wishlist
                      </Link>
                    </li> */}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" to="/account/notification">
                        <i className="bi bi-bell-fill text-primary"></i>&nbsp;
                        Notification
                      </Link>
                    </li> */}
                    <li>
                      <Link className="dropdown-item" to="#" onClick={(e) => { e.preventDefault(); window.location.href = "mailto:support@autoassure.me"; }}>
                        <i className="bi bi-info-circle-fill text-success"></i>
                        &nbsp; Support
                      </Link>
                    </li>
                    {session.role === "seller" && (
                      <li>
                        <Link className="dropdown-item" to="/listing/new">
                          <i className="bi bi-plus-circle-fill text-primary"></i>
                          &nbsp; Post Ad
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-in-left text-danger"></i>
                        &nbsp; Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account/signin">
                        <i className="bi bi-box-arrow-in-right text-primary"></i>
                        &nbsp; Sign In
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/signup">
                        <i className="bi bi-person-check text-success"></i>
                        &nbsp; Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
