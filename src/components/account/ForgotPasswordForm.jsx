import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import axios from "axios";
import renderFormGroupField from "../../helpers/renderFormGroupField";
// import { setSession } from "../../actions/session";
import { required, email } from "../../helpers/validation";
import { ReactComponent as IconEmail } from "bootstrap-icons/icons/envelope.svg";
import {successDialog, errorDialog} from "../../helpers/alerts.js";

const ForgotPasswordForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;
  
  const onSubmit = async (formValues) => {
    const data = JSON.stringify(formValues);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/users/forget-password`,
      // url: 'https://jsonplaceholder.typicode.com/posts', // Dummy API endpoint
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log('Response:', response.data);
      if (response.data.status) {
        successDialog("An email has been sent!");
        window.location.href = "/account/signin";
      } else {
        errorDialog(response.data.msg);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      errorDialog("An error occurred. Please try again later.");
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
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Submit
        </button>
      </div>
      <Link className="float-start" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link className="float-end" to="/account/signin" title="Sign In">
        Sign In
      </Link>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "forgotpassword",
  })
)(ForgotPasswordForm);
