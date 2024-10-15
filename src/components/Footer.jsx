import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
    
      <div className="container-fluid bg-dark text-white">
        <div className="row ">
          <div className="col-md-3 py-3">
            <div className="h6">AutoAssure</div>
            <hr />
            <p>
            AutoAssure was created to address the challenges faced by both vehicle sellers and buyers in ensuring that a proper, high-standard vehicle inspection is carried out when transferring ownership. 
            </p>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Vehicle Brands</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Toyota
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Nissan
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Honda
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  BMW
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Audi
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Policy</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Return Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Terms Of Use
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Security
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Privacy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  EPR Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Address</div>
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
