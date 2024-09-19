import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../../data';
import './OurAssurance.css';

// Lazy loading components
const CardList = lazy(() => import('../../components/blog/CardList'));

const OurAssurance = () => {
  // Inline styles for different elements
  const imgStyle = {
    width: '100%',
    height: '300px', // Adjust height as needed
    objectFit: 'cover',
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

  // Header styles
  const headerStyle = {
    backgroundColor: '#285594', // Header background color
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center',
    borderBottom: '3px solid #cccccc', // Bottom border to match style
  };

  const headerTitleStyle = {
    fontSize: '2.5rem', // Title font size
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const headerSubtitleStyle = {
    fontSize: '1.5rem', // Subtitle font size
    marginTop: '0.5rem',
  };

  return (
    <div className="our-assurance-container">
      {/* Header Section */}
      <header style={headerStyle}>
        <div className="container">
          <h1 style={headerTitleStyle}>AutoAssure</h1>
          <p style={headerSubtitleStyle}>
            Revolutionizing Vehicle Inspection Partner
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container my-3">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="card shadow-sm" style={cardStyle}>
              <img
                src="/images/assurance/sellCar.jpg"
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
                <Link
                  to="/"
                  className="stretched-link btn btn-sm btn-light"
                  style={stretchedLinkStyle}
                >
                  Create an ad
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm" style={cardStyle}>
              <img
                src="/images/assurance/mobileMechanic.jpg"
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
                <Link
                  to="/"
                  className="stretched-link btn btn-sm btn-light"
                  style={stretchedLinkStyle}
                >
                  Book vehicle inspections
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section Only - Widgets Removed */}
        <div className="row">
          <div className="col-md-12">
            <Suspense fallback={<div>Loading Blog List...</div>}>
              {data.blogList.map((item, idx) => (
                <CardList key={idx} data={item} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAssurance;
