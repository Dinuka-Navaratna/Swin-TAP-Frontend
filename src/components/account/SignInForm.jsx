import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { setSession } from "../../actions/session";
import { required, email, maxLength20, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconEmail } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import {alertDialog, confirmDialog, promptDialog, successDialog, errorDialog, warningDialog, infoDialog, questionDialog} from "../../helpers/alerts.js";

const SignInForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;

  const onSubmit = async (formValues) => {
    const data = JSON.stringify(formValues);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/users/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log('Response:', response.data);
      if (response.data.status) {
        const decoded = jwtDecode(response.data.data);
        const sessionData = {
          ...decoded,
          token: response.data.data
        };
        setSession(sessionData);
        successDialog("Login successful!");
        window.location.href = "/account/profile";
      } else {
        warningDialog("Login failed. Please check your credentials.");
        console.log("Login failed: "+response.data.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        alertDialog(`Login failed: ${error.response.data.message}`);
      } else {
        errorDialog("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <Field
        name="email"
        type="email"
        label="Email"
        component={renderFormGroupField}
        placeholder="Email address"
        icon={IconEmail}
        validate={[required, email]}
        required={true}
        className="mb-3"
        normalize={(value) => value && value.toLowerCase()}
      />
      <Field
        name="password"
        type="password"
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Log In
        </button>
      </div>
      <Link className="float-start" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <i className="bi bi-twitter-x" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <i className="bi bi-facebook mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <i className="bi bi-google mx-1" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
