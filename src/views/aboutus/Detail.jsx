import React from "react";
import "./style.css";

const AboutUsDetailView = () => {
  return (
    <div>
      <header className="headerStyle">
        <div className="container">
          <h1 className="headerTitleStyle">AutoAssure</h1>
          <h2 className="headerSubtitleStyle">
            Revolutionizing Vehicle Inspection Partner
          </h2>
          <p>
            At AutoAssure, we enhance the vehicle selling and buying process
            through trusted inspections.
          </p>
        </div>
      </header>

      <section className="about-section">
        <img src="../../images/blog/aboutus.jpg" className="about-img" alt="" />

        <div className="about-content">
          <br></br>
          <br></br>
          <h2>Who We Are</h2>
          <p>
            In the dynamic world of automotive sales, AutoAssure stands as a
            beacon of innovation and reliability. We connect sellers, buyers,
            and mechanics, providing a platform that ensures transparency and
            confidence in vehicle transactions.
          </p>
          <p>
            Our platform empowers vehicle sellers to seamlessly integrate
            verified mechanic services, ensuring that every vehicle meets our
            high standards for quality and safety. Through our network, we
            enable sellers to enhance their listings with certified inspections,
            fostering trust and streamlining sales.
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          {/* Left Content */}
          <div className="services-text">
            <h2>What Services Do We Provide</h2>
            <br></br>
            <p>
              AutoAssure provides a variety of services to streamline the
              vehicle inspection and transaction process. Our platform connects
              sellers, buyers, and qualified mechanics, ensuring transparency
              and reliability during vehicle inspections.
            </p>
            <ul>
              <li>Vehicle Inspection Scheduling</li>
              <li>Qualified Mechanic Directory</li>
              <li>Inspection Report Generation</li>
              <li>Vehicle Advertisement Posting</li>
              <li>Inspection Request Management</li>
              <li>Mechanic Verification</li>
            </ul>
          </div>
          {/* Right Content */}
          <div className="services-image">
            <img src="../../images/blog/imageus.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="section-container">
        <img
          src="../../images/blog/person1.jpg"
          className="section-image"
          alt=""
        />
        <div className="text-content">
          <br></br>
          <br></br>
          <h2>Our Mission</h2>
          <p>
            AutoAssure was created to address the challenges faced by both
            vehicle sellers and buyers in ensuring that a proper, high-standard
            vehicle inspection is carried out when transferring ownership. Our
            platform connects qualified mechanics, sellers, and buyers, ensuring
            transparency and reliability in the vehicle inspection process. We
            aim to streamline the collaboration between these key players,
            providing a one-stop solution for vehicle inspection scheduling,
            reporting, and certification by trusted professionals.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="text-content-wrapper">
          <h2 className="section-title">Why AutoAssure?</h2>
          <div className="text-block">
            <p>
              In the vehicle market, sellers need a trusted system to get
              certified inspections done before selling their vehicle, while
              buyers require confidence that the car they are purchasing has
              been thoroughly inspected. AutoAssure is designed to meet this
              need by:
            </p>
            <ul>
              <li>
                Helping sellers find qualified mechanics to perform vehicle
                inspections.
              </li>
              <li>
                Allowing sellers to post vehicle advertisements with or without
                inspection requests.
              </li>
              <li>
                Enabling mechanics to accept or reject inspection requests in
                their local area.
              </li>
              <li>
                Providing mechanics with tools to generate and share detailed
                inspection reports.
              </li>
              <li>
                Ensuring all mechanics are verified through a robust
                qualification process.
              </li>
            </ul>
          </div>
        </div>
        <br></br>

        <img
          src="../../images/blog/whyus1.avif"
          className="section-image"
          alt=""
        />
      </section>

      <section className="features-section">
        <h2 className="section-title">Features of AutoAssure</h2>
        <div className="features-content">
          <h5>
            AutoAssure brings together the key aspects of vehicle listing and
            inspection under one platform, creating a comprehensive solution for
            sellers, buyers, and mechanics alike. Our unique features include:
          </h5>
          <ul>
            <li>
              User registration and management for both sellers and mobile
              mechanics.
            </li>
            <li>Vehicle listing and inspection booking system.</li>
            <li>Mobile mechanic assignment and scheduling.</li>
            <li>
              Mechanic verification to ensure only qualified professionals
              provide inspection services.
            </li>
            <li>
              Inspection report generation and sharing between sellers, buyers,
              and mechanics.
            </li>
            <li>
              Integration with external car listing websites for easy vehicle
              advertisement.
            </li>
            <li>
              Payment processing for inspection services and lead generation for
              mobile mechanics.
            </li>
          </ul>
        </div>
      </section>

      <br></br>
      <br></br>
      <br></br>

      <section className="vision-section">
        <img
          src="../../images/blog/vision.jpg"
          className="vision-image"
          alt=""
        />
        <div className="vision-content">
          <h2 className="section-title-left">Our Vision</h2>
          <p>
            At AutoAssure, our vision is to revolutionize the vehicle inspection
            process by providing a platform that brings together sellers,
            buyers, and mechanics into one transparent ecosystem. We strive to
            create confidence in vehicle transactions, ensuring that all parties
            have the tools they need for a smooth, trustworthy, and efficient
            experience. Through innovation, verification, and collaboration,
            AutoAssure is setting a new standard for vehicle inspections.
          </p>
        </div>
      </section>

      <section className="glance-section">
        <h2 className="section-title">AutoAssure at a Glance</h2>
        <div className="glance-stats">
          <div className="glance-item">
            <h3>100+</h3>
            <p>Certified Mechanics</p>
          </div>
          <div className="glance-item">
            <h3>50+</h3>
            <p>Service Locations</p>
          </div>
          <div className="glance-item">
            <h3>2,500+</h3>
            <p>Satisfied Customers</p>
          </div>
          <div className="glance-item">
            <h3>500+</h3>
            <p>Vehicles Inspected Monthly</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Discover more about our services from our leadership team.</p>
      </footer>
    </div>
  );
};

export default AboutUsDetailView;

