import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSession } from "../../actions/session";
import './style.css';
import {warningDialog, errorDialog} from "../../helpers/alerts.js";

const AdsInspectionsView = () => {
  const [sessionData, setSessionData] = useState(null);
  const webPath = useLocation();
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const whatPage = () => {
    if (webPath.pathname === "/account/ads") {
      return "ads";
    } else if (webPath.pathname === "/account/inspections") {
      return "inspections";
    } else {
      return "error";
    }
  };

  useEffect(() => {
    const session = getSession();
    if (session) {
      setSessionData(session);
    } else {
      warningDialog("Log in to view "+whatPage());
      window.location.href = "/account/signin";
    }

    const fetchAds = async (endpoint) => {
      setLoading(true);
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}` + endpoint
      };

      try {
        const response = await axios.request(config);
        console.log(response.data.data.data);
        setAds(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (whatPage() === "ads" || whatPage() === "inspections") {
      whatPage() === "ads" ? fetchAds(`/api/vehicle?sellerId=` + (session.user_id)) : fetchAds(`/api/inspection-report?mechanic=` + (session.user_id));
    } else {
      errorDialog("Requested page not found!");
      window.location.href = "/listing";
    }
  }, [webPath]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    // return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  };

  return (
    <div className="container mb-3">
      <br></br>
      <h4 className="my-3">{whatPage() === "ads" ? "My Advertisements" : whatPage() === "inspections" ? "My Inspections" : "Unknown Page"}</h4>
      <br></br>
      <div className="row g-3">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {ads && ads.length > 0 ? (
              ads.map(ad => (
                <div className="col-md-6">
                  <div className="card">
                    <div className="row g-0">
                      <div className="col-md-3 text-center">
                        <img
                          src="../../images/products/vehicle.jpg"
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-header">
                          <div className="small">
                            {/* <span className="border bg-secondary rounded-left px-2 text-white">
                          Inspection ID
                        </span>
                        <span className="border bg-white rounded-right px-2 me-2">
                          #123456
                        </span> */}
                            <span className="border bg-secondary rounded-left px-2 text-white">
                              Advertised on:
                            </span>
                            <span className="border bg-white rounded-right px-2">
                              {formatDate(ad.created_at)}
                            </span>
                            <span className="float-right px-2">
                              <Link to={"/listing/" + ad._id} className="text-decoration-none">More Details &gt;&gt;</Link>
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          <h6>
                            <Link to={"/listing/" + ad._id} className="text-decoration-none">
                              {ad.title}
                            </Link>
                          </h6>
                          <span className="me-3">${ad.price}</span>
                          {
                            /* <div className="small">
                          <span className="text-muted me-2">Size:</span>
                          <span className="me-3">M</span>
                          <span className="text-muted me-2">Price:</span>
                          <span className="me-3">$1234</span>
                          <span className="text-muted me-2">Color:</span>
                          <span className="me-3">
                            <span className="bg-primary px-1 rounded">
                              &nbsp;&nbsp;&nbsp;
                            </span>
                          </span>
                        </div> */
                          }
                          <div className="mt-2"></div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                          <div>
                            <span className="me-2">Inspection:</span>
                            {ad.inspection_status === "not_requested" ? (
                              <span className="text-warning">
                                <i className="bi bi-backspace-reverse-fill me-1"></i>
                                Not Requested
                              </span>
                            ) : ad.inspection_status === "requested" ? (
                              <span className="text-dark">
                                <i className="bi bi-hand-thumbs-up-fill me-1"></i>
                                Requested
                              </span>
                            ) : ad.inspection_status === "accepted" ? (
                              <span className="text-primary">
                                <i className="bi bi-clock-history me-1"></i>
                                Upcoming
                              </span>
                            ) : ad.inspection_status === "completed" ? (
                              <span className="text-success">
                                <i className="bi bi-check-circle-fill me-1"></i>
                                Completed
                              </span>
                            ) : ad.inspection_status === "cancelled" ? (
                              <span className="text-danger">
                                <i className="bi bi-x-circle-fill me-1"></i>
                                Cancelled
                              </span>
                            ) : (
                              <span className="text-warning">
                                <i className="bi bi-exclamation-triangle-fill me-1"></i>
                                N/A
                              </span>
                            )}
                          </div>
                          <div>
                            {ad.inspection_status === "completed" && (
                              <>
                                <span className="me-2">Report:</span>
                                <span className="text-success">
                                  <Link to="https://api.autoassure.me/uploads/" target="_blank" rel="noopener noreferrer">
                                    <i className="bi bi-receipt-cutoff me-1"></i>
                                    Download
                                  </Link>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (<><div className="col-md-6">No {whatPage()} found!</div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></>)}
          </>
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default AdsInspectionsView;
