import React from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { compose } from "redux";
import { successDialog, errorDialog } from "../../helpers/alerts.js";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLengthMobileNo, minLengthMobileNo, digit, name, email } from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";

const capitalizeWords = (value) =>
  value && value.replace(/\b\w/g, char => char.toUpperCase());
const lowercase = (value) =>
  value && value.toLowerCase();

const handlePasswordReset = async (userEmail) => {
  const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL}/api/users/forget-password`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ "email": userEmail })
  };

  try {
    const response = await axios.request(config);
    console.log('Response:', response.data);
    if (response.data.status) {
      successDialog("An email has been sent!");
    } else {
      errorDialog(response.data.msg);
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    errorDialog("An error occurred. Please try again later.");
  }
};

const ProfileForm = (props) => {
  const { handleSubmit, userEmail, userRole } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-primary">
        <h6 className="card-header d-flex align-items-center justify-content-between">
          <span>
            <i className="bi bi-person-lines-fill" /> Profile Details {userRole === "mechanic" ? "(Verified)" : userRole === "mechanicNotVerified" ? "(Not Verified)" : ""}
          </span>
          <button
            type="submit"
            className="btn btn-primary d-flex"
            style={{ float: "right", padding: "2px 8px", fontSize: "small" }}
          >
            Submit
          </button>
        </h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Field
              name="name"
              type="text"
              disabled={userRole === "mechanic"}
              component={renderFormGroupField}
              placeholder="Your Name"
              icon={IconPerson}
              validate={[required, name]}
              required={true}
              normalize={capitalizeWords}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="phone"
              type="number"
              component={renderFormGroupField}
              placeholder="Mobile Number"
              icon={IconPhone}
              validate={[maxLengthMobileNo, minLengthMobileNo, digit]}
              required={true}
              max="999999999999999"
              min="9999"
            />
          </li>
          <li className="list-group-item">
            <Field
              name="email"
              type="email"
              id="userEmail"
              disabled={true}
              component={renderFormGroupField}
              placeholder="Email Address"
              icon={IconEnvelop}
              validate={[required, email]}
              normalize={lowercase}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="address"
              type="text"
              component={renderFormGroupField}
              placeholder="Address"
              icon={IconGeoAlt}
              validate={[]}
              normalize={capitalizeWords}
            />
          </li>
          <li className="list-group-item" style={{ textAlign: "center", fontWeight: "bold", fontSize: "small" }}>
            <p>Forgot your password?<br />Request a password reset email below.</p>
            <button
              type="button"
              className="btn btn-dark d-flex"
              onClick={() => handlePasswordReset(userEmail)}
              style={{ marginLeft: "auto", marginRight: "auto", fontSize: "small" }}>
              Reset Password
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
    onSubmit: (values, dispatch, props) => {
      props.handleProfileSubmit(values);
    },
  })
)(ProfileForm);
