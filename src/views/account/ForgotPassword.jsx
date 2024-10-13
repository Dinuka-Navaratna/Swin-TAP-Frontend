import {infoDialog} from "../../helpers/alerts.js";
import React, { useEffect, lazy } from "react";
import { getSession } from "../../actions/session";
const ForgotPasswordForm = lazy(() => import("../../components/account/ForgotPasswordForm"));


const ForgotPasswordView = () => {
  useEffect(() => {
    const session = getSession();
    if (session) {
      infoDialog(session);
      infoDialog("You'are already logged in using '"+session+"'.\nPlease logout to sign in as a different user.");
      window.location.href = "/account/profile";
    }
  }, []);

  const onSubmit = async (values) => {
    infoDialog(JSON.stringify(values));
  };
  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
          <img
            src="../../images/banner/Banner_4.jpg"
            alt="..."
            className="img-fluid"
          />
          
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Forgot Password</h4>
          <br></br>
          <ForgotPasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
