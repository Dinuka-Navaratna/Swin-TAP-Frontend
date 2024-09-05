import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSession, clearSession } from "../actions/session";

const Header = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionData = getSession();
    if (sessionData) {
      setSession(sessionData);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      clearSession();
      setSession(null);
      window.location.reload();
    } else {
      alert("That's what I thought, you dummy!\nThink twice before clicking!");
    }
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
          {/* <div className="col-md-5">
            <Search />
          </div> */}
          <div className="col-md-6 navbar navbar-expand-lg navbar-light bg-light p-0">
            {/* <div className="position-relative d-inline me-3">
              <Link to="/cart" className="btn btn-primary">
                <i className="bi bi-cart3"></i>&nbsp;
                <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                  2
                </div>
              </Link>
            </div> */}
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
                {/* <li className="nav-item dropdown">
                  <button
                    className="btn nav-link dropdown-toggle fw-bold"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    All Pages
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/account/signin">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/signup">
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/checkout">
                        Checkout Page
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/contact-us">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/blog/detail">
                        Blog Detail
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/fsafasf">
                        404 Page Not Found
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/500">
                        500 Internal Server Error
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">
                    Vehicle Listing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
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
                
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/documentation">
                    Documentation
                  </Link>
                </li> */}
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
                    <li>
                      <Link className="dropdown-item" to="/star/zone">
                        <i className="bi bi-star-fill text-warning"></i>&nbsp;
                        Star Zone
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/orders">
                        <i className="bi bi-list-check text-primary"></i>&nbsp;
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/wishlist">
                        <i className="bi bi-heart-fill text-danger"></i>&nbsp;
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/notification">
                        <i className="bi bi-bell-fill text-primary"></i>&nbsp;
                        Notification
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/support">
                        <i className="bi bi-info-circle-fill text-success"></i>&nbsp;
                        Support
                      </Link>
                    </li>
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
            {/* <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
