import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import axios from "axios";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import { required, maxLength20, minLength8, email, name } from "../../helpers/validation";
import { ReactComponent as IconEmail } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { successDialog, errorDialog, warningDialog } from "../../helpers/alerts.js";

const SignUpForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;

  const onSubmit = async (formValues) => {
    const mechanic = formValues.mechanic;
    var role = "seller";
    if (mechanic && mechanic === true) {
      role = "mechanic";
    }

    const data = JSON.stringify({
      name: `${formValues.firstName} ${formValues.lastName}`,
      email: formValues.email,
      password: formValues.password,
      role: role,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      console.log(data);
      const response = await axios.request(config);
      if (response.data.status) {
        // console.log(response.data.data);
        successDialog("Sign up successful!\nPlease sign in to continue.").then(
          () => {
            window.location.href = "/account/signin";
          }
        );
      } else {
        warningDialog("Sign up failed!<br>" + response.data.msg);
        console.log("User registration failed: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      errorDialog("An error occurred. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            name="firstName"
            type="text"
            label="First Name"
            component={renderFormField}
            placeholder="First Name"
            validate={[required, name]}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="lastName"
            type="text"
            label="Last Name"
            component={renderFormField}
            placeholder="Last Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>
      <Field
        name="email"
        type="email"
        label="Email:"
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
      <Field
        name="mechanic"
        type="checkbox"
        label="Register as Mechanic?"
        component={renderFormGroupField}
        className="mb-3"
      />
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create
        </button>
      </div>
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sign In
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
