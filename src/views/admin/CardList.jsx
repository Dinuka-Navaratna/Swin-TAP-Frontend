import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { getSession } from "../../actions/session";
import { alertDialog, errorDialog, successDialog, warningDialog } from "../../helpers/alerts.js";

const CardList = (props) => {
  const session = getSession();
  const item = props.data;

  // State for modal visibility
  const [show, setShow] = useState(false);

  // Handlers to open and close modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // State for storing editable form data
  const [formData, setFormData] = useState({
    _id: item._id,
    name: item.name || "Not Provided",
    email: item.email || "Not Provided",
    phone: item.phone || "Not Provided",
    address: item.address || "Not Provided",
    mechanic_verification: item.mechanic_verification || "Not Provided",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (for updating the data)
  const handleSubmit = async (name) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/users`, formData, {
        headers: {
          Authorization: `Token ${session ? session.token : ""}`, //`Token ${session ? session.token : ""}`,
        },
      });
      successDialog(`User ${formData.name} updated successfully!`);
      props.getUsers(props.currentPage);
    } catch (error) {
      errorDialog("Error updating user");
    }
    handleClose(); // Close the modal after updating
  };

  // Delete a user
  const deleteUser = async (userId, name) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Token ${session ? session.token : ""}`,
          },
        }
      );
      successDialog(`User ${name} deleted successfully!`);
      props.getUsers(props.currentPage);
    } catch (error) {
      errorDialog("Error deleting user");
    }
  };

  // Create a new Date object
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div className="list-item d-flex align-items-start p-3 border-bottom">
      {/* Image section */}
      <img
        src={
          item?.image?.new_filename != null
            ? `${process.env.REACT_APP_API_URL}/uploads/300x300/${item?.image?.new_filename}`
            : "../../images/category/sample-user.jpg"
        }
        alt="vehicle"
        className="img-fluid rounded me-3"
        style={{ width: "150px", height: "auto" }}
      />
      {/* Content section */}
      <div className="flex-grow-1">
        <h6 className="card-subtitle mb-2">
          <p className="text-decoration-none" style={{ color: "#0d6efd" }}>
            {item.name ? item.name : "Not Provided"}
          </p>
        </h6>
        <div className="my-2">
          <p className="small mt-2">
            {!props.mechanic && (
              <>
                {" "}
                <b>Role:</b> {item.role || "Not Provided"} <br />
              </>
            )}
            <b>Email:</b> {item.email || "Not Provided"} <br />
            <b>Phone:</b> {item.phone || "Not Provided"} <br />
            <b>Address:</b> {item.address || "Not Provided"} <br />
            <b>Joined Date:</b>{" "}
            {new Date(item.created_at).toLocaleDateString(undefined, options) ||
              "Not Provided"}{" "}
            <br />
            {item.role === "mechanic" && (
              <>
                <b>Mechanic Verification Status:</b>{" "}
                {(item.mechanic_verification === "verified"
                  ? "Verified"
                  : "Not Verified") || "Not Provided"}{" "}
                <br />
              </>
            )}
            {item.role === "mechanic" && (
              <>
                <b>Identity Verification Documents:</b>{" "}
                {item.identity_verification_documents.length > 0 ? (
                  <>
                    {item.identity_verification_documents.map((doc, index) => (
                      <a
                        href={`https://api.autoassure.me/uploads/${doc.new_filename}`}
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                        className="text-decoration-none"
                      >
                        Doc-{index + 1}&nbsp;&nbsp;
                      </a>
                    ))}
                  </>
                ) : (
                  "Not Provided"
                )}
                <br />{" "}
              </>
            )}
            {item.role === "mechanic" && (
              <>
                <b>Skill Verification Documents:</b>{" "}
                {item.skill_verification_documents.length > 0 ? (
                  <>
                    {item.skill_verification_documents.map((doc, index) => (
                      <a
                        href={`https://api.autoassure.me/uploads/${doc.new_filename}`}
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                        className="text-decoration-none"
                      >
                        Doc-{index + 1}&nbsp;&nbsp;
                      </a>
                    ))}
                  </>
                ) : (
                  "Not Provided"
                )}{" "}
              </>
            )}
          </p>
        </div>
        {/* Button section */}
        <div className="btn-group d-flex mt-3" role="group">
          <button
            type="button"
            className="btn btn-sm btn-primary mx-2"
            title="Update"
            onClick={handleShow}
          >
            <i className="bi bi-pencil-square" />
          </button>

          <a
            href={`mailto:${item.email}`}
            className="btn btn-sm btn-primary mx-1"
            title="Email"
          >
            <i className="bi bi-chat-left-text" />
          </a>

          <button
            type="button"
            className="btn btn-sm btn-danger mx-2"
            title="Delete"
            onClick={() => deleteUser(item._id, item.name)}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>

      {/* Modal for editing */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Edit ${item.role === "mechanic" ? "Mechanic" : "User"
            }`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mt-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCreatedAt" className="mt-3">
              <Form.Label>Joined Date</Form.Label>
              <Form.Control
                type="text"
                name="created_at"
                value={
                  new Date(item.created_at).toLocaleDateString(
                    undefined,
                    options
                  ) || "Not Provided"
                }
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            {item.role === "mechanic" && (
              <>
                <Form.Group
                  controlId="formMechanicVerification"
                  className="mt-3"
                >
                  <Form.Label>Mechanic Verification Status</Form.Label>
                  <Form.Select
                    name="mechanic_verification"
                    value={formData.mechanic_verification}
                    onChange={handleChange}
                  >
                    <option value="verified">Verified</option>
                    <option value="not_verified">Not Verified</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardList;
