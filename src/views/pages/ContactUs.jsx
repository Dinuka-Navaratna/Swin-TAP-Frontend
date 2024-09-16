import { lazy } from "react";
const ContactUsForm = lazy(() => import("../../components/ContactUsForm"));

const ContactUsView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="container my-3">
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <i className="bi bi-envelope"></i> Send Message/Enquiry
            </div>
            <div className="card-body">
            <p>Have suggestions on how we can improve your experience online and mobile mechanic services? Let us know by completing the form below or call <strong><a href="tel:(123) 456-7890">(123) 456-7890</a></strong>.</p>
              <ContactUsForm onSubmit={onSubmit} />
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
                //src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d313635.5491853188!2d-122.57606416467848!3d37.20933611930123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815c67b3754d%3A0xb42714f3436732f2!2s1355%20Market%20St%20%23900%2C%20San%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sin!4v1599193189366!5m2!1sen!2sin"
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
