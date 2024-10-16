import React, { useEffect, lazy } from "react";
import { getSession } from "../../actions/session";
import { infoDialog } from "../../helpers/alerts.js";
const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const SignInView = () => {
  useEffect(() => {
    const session = getSession();
    if (session) {
      infoDialog("You'are already logged in as '"+session.name+"'.\nPlease logout to sign in as a different user.");
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
            className="login-img"
          />
          
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Sign In</h4>
          <br></br>
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignInView;

