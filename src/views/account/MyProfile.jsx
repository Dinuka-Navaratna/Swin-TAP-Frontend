import { lazy, Component } from "react";
import { getSession } from "../../actions/session";
import { infoDialog } from "../../helpers/alerts.js";
import './style.css';
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() => import("../../components/account/ChangePasswordForm"));
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() => import("../../components/account/CardListForm"));

class MyProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }
  }

  state = { imagePreview: "", isDeleting: false };

  handleProfileSubmit = async (values) => {
    console.log(values);
    alert('asd');
  };

  onSubmitChangePassword = async (values) => {
    console.log(JSON.stringify(values));
  };

  onImageChange = async (obj) => {
    if (obj) {
      const val = await this.getBase64(obj);
      this.setState({ imagePreview: val });
    } else {
      this.setState({ imagePreview: "" });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };

  render() {
    const { session } = this.state;
    if (!session) {
      return null;
    }

    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <div className="dp-image-container">
              <img
                src="../../images/dp.png"
                className="img-fluid mb-3"
                width=""
                height="240"
                alt=""
                data-image-id=""
              />
              <span className="hover-text">Click to Update</span>
            </div>
          </div>
          <div className="col-md-5">
            <ProfileForm
              handleProfileSubmit={this.handleProfileSubmit}
              onImageChange={this.onImageChange}
              imagePreview={this.state.imagePreview}
              userEmail={session.email}
              initialValues={{
                name: session.name,
                mobileNo: session.phone !== "Not Provided" ? session.phone : '',
                email: session.email || '',
                location: session.address || ''
              }}
            />
          </div>
          <div className="col-md-4">
            <CardListForm />
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
