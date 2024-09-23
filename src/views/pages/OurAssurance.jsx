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
          <h2 style={headerSubtitleStyle}>
            Revolutionizing Vehicle Inspection Partner
          </h2>
          <p>
            At AutoAssure, we enhance the vehicle selling and buying process
            through trusted inspections.
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

        
        
        {/* SellCar Section */}
<section className="sellcar-section">
  <img src="/images/assurance/sellCar.jpg" className="sellcar-img" alt="Sell Your Car with AutoAssure" />
  <div className="sellcar-content">
    <h2>Ready to sell your car? Our platform makes it easy, fast, and stress-free.</h2>
    <p>
      We understand that selling a car in today’s market can be challenging, with fluctuating demand and complex processes. That’s why we’ve streamlined everything for you—just list your car with AutoAssure, and we’ll connect you with serious buyers quickly. Plus, our expert resources guide you through every step, from setting the right price to handling paperwork. Selling your car has never been this simple or rewarding.
    </p>
  </div>
</section>

{/* BuyCar Section */}
<section className="buycar-section">
  <img src="/images/assurance/buycar.jpg" className="buycar-img" alt="Find Your Next Car with AutoAssure" />
  <div className="buycar-content">
    <h2>Looking for your next car? Our platform offers a wide range of quality vehicles, making it easy to find exactly what you need.</h2>
    <p>
      We know that buying a car can be overwhelming, especially with today’s supply challenges and long wait times. That’s why we’ve curated a seamless shopping experience—browse our extensive listings, compare options, and get expert advice to make the right choice. Buying a car has never been this straightforward or satisfying.
    </p>
  </div>
</section>

{/* MobileMechanic Section */}
<section className="mobilemechanic-section">
  <img src="/images/assurance/mobileMechanic.jpg" className="mobilemechanic-img" alt="Mobile Mechanic Pre-Inspection Service by AutoAssure" />
  <div className="mobilemechanic-content">
    <h2>Get your car ready to sell with our mobile mechanic pre-inspection service.</h2>
    <p>
      We bring the inspection to you, ensuring your vehicle is in top shape before hitting the market. With a detailed report in hand, you can attract serious buyers and secure the best price, all while selling with confidence. Make your sale smoother and faster by letting us take care of the inspection—right at your doorstep.
    </p>
  </div>
</section>

      </div>
    </div>
  );
};

export default OurAssurance;
