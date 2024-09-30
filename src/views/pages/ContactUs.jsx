import React, { lazy, Suspense } from "react";
import axios from "axios";
import { successDialog, errorDialog } from "../../helpers/alerts.js";

// Lazy loading the ContactUsForm component
const ContactUsForm = lazy(() => import("../../components/ContactUsForm"));

// Header styles
const headerStyle = {
  backgroundColor: '#285594', // Blue background
  color: 'white',
  padding: '60px 20px',
  textAlign: 'center',
};

const headerTitleStyle = {
  fontSize: '3rem', // Title font size
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const headerSubtitleStyle = {
  fontSize: '1.5rem', // Subtitle font size
  marginBottom: '1rem',
};

const headerDescriptionStyle = {
  fontSize: '1rem', // Description text size
  maxWidth: '800px', // Max width for centered text block
  margin: '0 auto', // Centering the text
  lineHeight: '1.6', // Line height for better readability
};

const ContactUsView = () => {
  const onSubmit = async (values, dispatch, props) => {
    successDialog(JSON.stringify(values.name));  // Test alert

    // Create the data structure required by the API
    const data = JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.mobileNo,
      subject: values.subject,
      message: values.message,
    });

    // Define the axios request configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/users/contact-us`,  // Use environment variable
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data,
    };

    try {
      // Send the request using axios
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      // Check if the submission was successful
      if (response.data.status === "false") {
        errorDialog("Error submitting the form!");
      } else {
        successDialog("Form submitted successfully!");
        // Reset the form fields after a successful submission
        props.reset();  // Call reset
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Error submitting the form.");
    }
  };

  return (
    <div className="container-fluid my-3"> {/* Changed to container-fluid for full-width */}
      <div className="row g-3">
        <div className="col-md-12">
          {/* Header Section */}
          <header style={headerStyle}>
            <h1 style={headerTitleStyle}>CONTACT US</h1>
            <h2 style={headerSubtitleStyle}>
            Our team of customer service is ready to help you.  
            </h2>
            <p style={headerDescriptionStyle}>
           
            </p>
          </header>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-envelope"></i> Send Message/Enquiry
            </div>
            <div className="card-body">
              <p>
                Have suggestions on how we can improve your experience online and mobile mechanic services? Let us know by completing the form below or call 
                <strong><a href="tel:(123) 456-7890">(123) 456-7890</a></strong>.
              </p>
              <Suspense fallback={<div>Loading...</div>}>
                <ContactUsForm onSubmit={onSubmit} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-header">
              <i className="bi bi-building"></i> Address
            </div>
            <div className="card-body">
              <h6 className="card-title border-bottom border-dark pb-2">
                Head Office
              </h6>
              <address>
                <strong>AutoAssure, Inc.</strong>
                <br />
                35 Wakefield St
                <br />
                Hawthorn VIC 3122
                <br />
                <i className="bi bi-telephone"></i>{" "}
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>
              <h6 className="card-title border-bottom border-dark pb-2">
                Development Office
              </h6>
              <address>
                <strong>AutoAssure, Inc.</strong>
                <br />
                35 Wakefield St
                <br />
                Hawthorn VIC 3122
                <br />
                <i className="bi bi-telephone"></i>{" "}
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>
            </div>
          </div>
          <div className="card">
            <div className="google-maps">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.6816121288875!2d145.03563707588572!3d-37.82092597197372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642329bf63f57%3A0xd18a10510bdc56c8!2sSwinburne%20College!5e0!3m2!1sen!2sau!4v1726385885534!5m2!1sen!2sau"
                width={400}
                height={300}
                frameBorder={0}
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                title="Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsView;
