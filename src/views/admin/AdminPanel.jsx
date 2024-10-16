import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSession } from "../../actions/session";
import Analytics from "./Analytics";
import "./admin.css";

const AdminPanel = () => {
  // Inline styles for different elements
  const imgStyle = {
    width: "100%",
    height: "300px", // Adjust height as needed
    objectFit: "cover",
  };

  const cardStyle = {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const cardBodyStyle = {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  };

  const stretchedLinkStyle = {
    marginTop: "auto",
  };

  const session = getSession();

  useEffect(() => {
    if (session?.role !== "admin") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="our-assurance-container">
      {/* Header Section */}
      <header className="headerStyle">
        <div className="container">
          <h1 className="headerTitleStyle">AutoAssure</h1>
          <h2 className="headerSubtitleStyle">
            Admin panel, for managing sellers, mechanics and to view analytical
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <div className="container my-3">
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm" style={cardStyle}>
              <img
                src="/images/admin/seller-back.jpg"
                alt="Sell Car"
                style={imgStyle}
              />
              <div className="card-body" style={cardBodyStyle}>
                <strong className="d-inline-block mb-2 text-primary">
                  Sellers
                </strong>
                <h4 className="card-title">Manage Sellers</h4>
                <p className="card-text mb-auto">
                  <ul>
                    <li>View seller details</li>
                    <li>Filter and search sellers</li>
                    <li>Update seller details</li>
                    <li>Delete sellers</li>
                  </ul>
                </p>
                <Link
                  to="/admin/seller-management"
                  className="stretched-link btn btn-sm btn-light"
                  style={stretchedLinkStyle}
                >
                  View seller management
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card shadow-sm" style={cardStyle}>
              <img
                src="/images/admin/mechanic-back.jpg"
                alt="Mobile Mechanic"
                style={imgStyle}
              />
              <div className="card-body" style={cardBodyStyle}>
                <strong className="d-inline-block mb-2 text-success">
                  Mechanics
                </strong>
                <h4 className="card-title">Manage Mechanics</h4>
                <p className="card-text mb-auto">
                  <ul>
                    <li>View mechanic details</li>
                    <li>Filter and search mechanics</li>
                    <li>Update mechanic details</li>
                    <li>Delete mechanics</li>
                  </ul>
                </p>
                <Link
                  to="/admin/mechanic-management"
                  className="stretched-link btn btn-sm btn-light"
                  style={stretchedLinkStyle}
                >
                  View mechanic management
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Analytics />
      </div>
    </div>
  );
};

//   <>
//     <div className="container py-5">
//       <div className="row d-flex justify-content-center p-0 m-0">
//         <div className="col-4 d-flex flex-column align-items-center p-0 m-0">
//           <Link
//             to="/admin/user-management"
//             className="text-decoration-none m-0 p-5 align-items-center d-flex flex-column"
//           >
//             <img
//               src="../../images/category/user-management.png"
//               className="img-fluid"
//               alt="..."
//             />
//             <div className="text-center mt-2">User Management</div>
//           </Link>
//         </div>
//         <div className="col-4 d-flex flex-column align-items-center p-0 m-0 align-items-center">
//           <Link
//             to="/admin/mechanic-management"
//             className="text-decoration-none m-0 p-5 align-items-center d-flex flex-column"
//           >
//             <img
//               src="../../images/category/mechanic-management.png"
//               className="img-fluid"
//               alt="..."
//             />
//             <div className="text-center mt-2">Mechanic Management</div>
//           </Link>
//         </div>
//         {/* <div className="col-4 d-flex flex-column align-items-center p-0 m-0">
//           <Link
//             to="/"
//             className="text-decoration-none m-0 p-5 align-items-center d-flex flex-column"
//           >
//             <img
//               src="../../images/category/vehicle-management.png"
//               className="img-fluid rounded-circle"
//               alt="..."
//             />
//             <div className="text-center mt-2">Advertisement Management</div>
//           </Link>
//         </div> */}
//       </div>
//     </div>
//     <Analytics />
//   </>

export default AdminPanel;
