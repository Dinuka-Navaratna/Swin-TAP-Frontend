import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      {/* <div className="container-fluid bg-primary">
        <div className="row ">
          <div className="col-md-9 py-3 text-white">
            Get connected with us on social networks!
          </div>
          <div className="col-md-3 py-3 text-center text-white">
            <Link to="/" title="Apple">
              <i className="bi bi-apple text-light me-3"></i>
            </Link>
            <Link to="/" title="Windows">
              <i className="bi bi-windows text-light me-3"></i>
            </Link>
            <Link to="/" title="Android">
              <i className="bi bi-android2 text-light me-3"></i>
            </Link>
            |
            <Link to="/" title="Twitter">
              <i className="bi bi-twitter-x text-light ms-3 me-3"></i>
            </Link>
            <Link to="/" title="Facebook">
              <i className="bi bi-facebook text-light me-3"></i>
            </Link>
            <Link to="/" title="Instagram">
              <i className="bi bi-instagram text-light me-3"></i>
            </Link>
            <Link to="/" title="Youtube">
              <i className="bi bi-youtube text-light me-3"></i>
            </Link>
          </div>
        </div>
      </div> */}

      <div className="container-fluid bg-dark text-white">
        <div className="row py-3">
          <div className="col-md-3 py-3" style={{ padding: "0px 20px" }}>
            <div className="h6">AutoAssure</div>
            <hr />
            <p style={{ textAlign: "justify" }}>
              AutoAssure was created to address the challenges faced by both vehicle sellers and buyers in ensuring that a proper, high-standard vehicle inspection is carried out when transferring ownership.
            </p>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Navigation</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Home
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/listing"
                  className="text-decoration-none text-white stretched-link"
                >
                  Vehicle Listing
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/about-us"
                  className="text-decoration-none text-white stretched-link"
                >
                  About Us
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/contact-us"
                  className="text-decoration-none text-white stretched-link"
                >
                  Contact Us
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/terms-condition"
                  className="text-decoration-none text-white stretched-link"
                >
                  T & C
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light"></li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Why AutoAssure?</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                Convenience
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                Quick and Easy Listing
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                Transparency
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                Increased Marketability
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                Increased Buyser Assurance
              </li>
              <li className="list-group-item bg-dark text-white border-light"></li>
            </ul>
          </div>
          <div className="col-md-3 py-3" >
            <div className="h6">Contact Us</div>
            <hr />
            <address>
              <strong>AutoAssure</strong>
              <br />
              John St,
              <br />
              Hawthorn VIC 3122
              <br />
              <hr />
              <i className="bi bi-telephone"></i>&nbsp;&nbsp;(123) 456-7890
              <br />
              <i className="bi bi-envelope"></i>&nbsp;&nbsp;support@autoassure.me
            </address>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-secondary text-white text-center">
        <div className="row">

          <div className="col-md-9 py-2">
            © {new Date().getFullYear()} autoassure.me ({process.env.REACT_APP_VERSION})
          </div>


          <div className="col-md-3 py-2 bg-white" style={{ color: "#000" }}>
            In association with: <img src="../../images/swinburne-logo.png" alt="Swinburne University Logo" style={{ height: "25px" }}></img>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
