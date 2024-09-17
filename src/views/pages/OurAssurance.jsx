import { lazy } from "react";
import { Link } from "react-router-dom";
import { data } from "../../data";
const Banner = lazy(() => import("../../components/carousel/Banner"));
const CardList = lazy(() => import("../../components/blog/CardList"));
const Widgets = lazy(() => import("../../components/blog/Widgets"));

const OurAssurance = () => {
  const imgStyle = {
    width: '100%',
    height: '200px', // Adjust height as needed
    objectFit: 'cover'
  };

  const cardStyle = {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const cardBodyStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  };

  const stretchedLinkStyle = {
    marginTop: 'auto',
  };


  




  return (
    <div className="container my-3">
      <Banner className="mb-3" id="carouselBlogBanner" data={data.blogBanner} />

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="card shadow-sm" style={cardStyle}>
            <img
              src="./../images/assurance/sellCar.jpg"
              alt="Sell Car"
              style={imgStyle}
            />
            <div className="card-body" style={cardBodyStyle}>
              <strong className="d-inline-block mb-2 text-primary">Sell</strong>
              <h4 className="card-title">Advertise on AutoAssure</h4>
              <p className="card-text mb-auto">
                <ul>
                  <li>Convenience</li>
                  <li>Quick and Easy Listings</li>
                  <li>Flexibility in Communication</li>
                  <li>Reach millions of potential buyers, until sold</li>
                </ul>
              </p>
              <Link to="/" className="stretched-link btn btn-sm btn-light" style={stretchedLinkStyle}>
                Create an ad
                <i className="bi bi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm" style={cardStyle}>
            <img
              src="./../images/assurance/mobileMechanic.jpg"
              alt="Mobile Mechanic"
              style={imgStyle}
            />
            <div className="card-body" style={cardBodyStyle}>
              <strong className="d-inline-block mb-2 text-success">Inspection</strong>
              <h4 className="card-title">AutoAssure Vehicle Inspections</h4>
              <p className="card-text mb-auto">
                <ul>
                  <li>Transparency</li>
                  <li>Identifying Issues Early</li>
                  <li>Increased Marketability</li>
                  <li>Increased Buyer Confidence</li>
                </ul>
              </p>
              <Link to="/" className="stretched-link btn btn-sm btn-light" style={stretchedLinkStyle}>
                Book vehicle inspections
                <i className="bi bi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {data.blogList.map((item, idx) => (
            <CardList key={idx} data={item} />
          ))}
        </div>
        <div className="col-md-4">
          <Widgets />
        </div>
      </div>
    </div>

    
  );
};



export default OurAssurance;
