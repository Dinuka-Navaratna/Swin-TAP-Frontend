import { lazy, Component } from "react";
import axios from "axios";
import { getSession, setRole } from "../../actions/session";
import { successDialog, errorDialog } from "../../helpers/alerts.js";
import uploadFile from '../../helpers/uploadFile.js';
import './style.css';
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const DocumentUpload = lazy(() => import("../../components/account/DocumentUpload"));

class MyProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      session: null,
      imagePreview: "",
      isDeleting: false
    };
  }

  componentDidMount() {
    const session = getSession();
    if (!session) {
      window.location.href = "/account/signin";
    } else {
      this.setState({ session });

      let config = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/users/${session.user_id}`
      };

      axios.request(config)
        .then((response) => {
          if (response.data.status === false) {
            errorDialog("Error fetching user data");
            console.log(response);
          } else {
            this.setState({ userDetails: response.data.data });
            console.log(response.data.data);
            if (response.data.data.role === "mechanic" && response.data.data.mechanic_verification === "verified" && session.role !== "mechanic") {
              setRole("mechanic");
              window.location.reload();
            } else if (response.data.data.role === "mechanic" && response.data.data.mechanic_verification === "not_verified" && session.role !== "mechanicNotVerified") {
              setRole("mechanicNotVerified");
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          errorDialog("An error occurred while fetching the user data.");
          console.log(error);
        });
    }
  }

  handleProfileSubmit = async (values) => {
    const session = getSession();
    if (!session) {
      window.location.href = "/account/signin";
    } else {
      values['_id'] = session.user_id;
      Object.keys(values).forEach(key => {
        if (values[key] === '') {
          delete values[key];
        }
      });
      const data = JSON.stringify(values);

      const config = {
        method: 'PUT',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/users/`,
        headers: {
          'Authorization': `Token ${session.token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      try {
        const response = await axios.request(config);
        if (response.data.status === false) {
          errorDialog(response.data.msg);
        } else {
          successDialog("Profile details updated successfully.").then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        errorDialog("An error occurred while updating the details: " + error);
      }
    }
  };

  handleProfilePicture = async () => {
    const { session } = this.state;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (inputEvent) => {
      const file = inputEvent.target.files[0];
      if (file) {
        try {
          const response = await uploadFile(file, session.token);
          if (response.status) {
            this.updateUserFiles(response.data._id).catch(err => errorDialog('Failed to update user files: ' + err));
            successDialog('Profile picture uploaded successfully').then(() => {
              window.location.reload();
            });
          } else {
            errorDialog('Profile picture upload error!');
          }
        } catch (err) {
          errorDialog('Failed to upload profile picture: ' + err);
        }
      }
    };
    input.click();
  };

  updateUserFiles = async (imageId) => {
    const { session } = this.state;
    const data = JSON.stringify({
      "_id": session.user_id,
      "image": imageId
    });

    const config = {
      method: 'PUT',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/users/`,
      headers: {
        'Authorization': `Token ${session.token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      if (response.data.status === false) {
        return response.data.msg;
      } else {
        return true;
      }
    } catch (error) {
      return ("An error occurred while updating the profile picture: " + error);
    }
  };

  render() {
    const { session, userDetails } = this.state;
    if (!session || userDetails === null) {
      return null;
    }

    return (
      <div className="container-fluid my-3">
        <br></br>
        <div className="row">
          {(session.role !== "mechanic" && session.role !== "mechanicNotVerified") &&
            <div className="col-md-1"></div>
          }
          <div className="col-md-3" style={{ textAlign: "center" }}>
            <div className="dp-image-container" onClick={() => this.handleProfilePicture()}>
              <img
                src={userDetails?.image?.new_filename ? `${process.env.REACT_APP_API_URL}/uploads/300x300/${userDetails.image.new_filename}` : "../../images/dp.png"}
                className="img-fluid mb-3"
                width=""
                height="240"
                alt=""
                data-image-id=""
              />
              <span className="hover-text">Click to Update</span>
            </div>
          </div>
          {(session.role !== "mechanic" && session.role !== "mechanicNotVerified") &&
            <div className="col-md-1"></div>
          }
          <div className="col-md-5">
            <ProfileForm
              handleProfileSubmit={this.handleProfileSubmit}
              onImageChange={this.onImageChange}
              imagePreview={this.state.imagePreview}
              userEmail={session.email}
              userRole={session.role}
              initialValues={{
                name: userDetails.name,
                phone: userDetails.phone !== "Not Provided" ? userDetails.phone : '',
                email: userDetails.email || '',
                address: userDetails.address || ''
              }}
            />
          </div>
          {(session.role === "mechanic" || session.role === "mechanicNotVerified") &&
            <div className="col-md-4">
              <DocumentUpload
                type={"identity_verification_documents"}
                uploadedDocs={userDetails.identity_verification_documents}
                token={session.token}
              />
              <br></br>
              <DocumentUpload
                type={"skill_verification_documents"}
                uploadedDocs={userDetails.skill_verification_documents}
                token={session.token}
              />
            </div>
          }
        </div>
        <br></br>
      </div>
    );
  }
}

export default MyProfileView;
