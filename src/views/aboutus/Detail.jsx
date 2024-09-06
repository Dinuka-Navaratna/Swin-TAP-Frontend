import React from 'react';
import './style.css';
//import { Link } from "react-router-dom"; // Remove this line if not used
// const Widgets = lazy(() => import("../../components/blog/Widgets"));

const AboutUsDetailView = () => {
    return (
        <div>
            {/* <header style={{ backgroundColor: '#28559A', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
                <h1>AutoAssure </h1>
                <h2>Revolutionizing Vehicle Inspection Partner</h2>

                <p>At AutoAssure, we enhance the vehicle selling and buying process through trusted inspections.</p>
            </header>

            <section style={{ padding: '40px 20px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <img src="../../images/blog/aboutus.jpg"
                    style={{ width: '50%', height: 'auto', marginRight: '20px' }}
                />
                <div style={{ maxWidth: '800px', textAlign: 'left' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Who We Are</h2>
                    <p>
                        In the dynamic world of automotive sales, AutoAssure stands as a beacon of innovation and reliability. We connect sellers, buyers, and mechanics, providing a platform that ensures transparency and confidence in vehicle transactions.
                    </p>
                    <p>
                        Our platform empowers vehicle sellers to seamlessly integrate verified mechanic services, ensuring that every vehicle meets our high standards for quality and safety. Through our network, we enable sellers to enhance their listings with certified inspections, fostering trust and streamlining sales.
                    </p>
                </div>
            </section> */}


                <header className="header">
                    <h1>AutoAssure </h1>
                    <h2>Revolutionizing Vehicle Inspection Partner</h2>
                    <p>At AutoAssure, we enhance the vehicle selling and buying process through trusted inspections.</p>
                </header>

                <section className="about-section">
                    <img src="../../images/blog/aboutus.jpg" className="about-img" />
                    <div className="about-content">
                        <h2>Who We Are</h2>
                        <p>
                            In the dynamic world of automotive sales, AutoAssure stands as a beacon of innovation and reliability. We connect sellers, buyers, and mechanics, providing a platform that ensures transparency and confidence in vehicle transactions.
                        </p>
                        <p>
                            Our platform empowers vehicle sellers to seamlessly integrate verified mechanic services, ensuring that every vehicle meets our high standards for quality and safety. Through our network, we enable sellers to enhance their listings with certified inspections, fostering trust and streamlining sales.
                        </p>
                    </div>
                </section>




            {/* <section style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#e0e0e0' }}>
                <div style={{ maxWidth: '1200px', margin: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    
                    <div style={{ flex: '1', textAlign: 'left', padding: '20px' }}>
                        <h2 style={{ fontSize: '28px', color: '#28559A' }}>What Services Do We Provide</h2>
                        <p>
                            AutoAssure provides a variety of services to streamline the vehicle inspection and transaction process.
                            Our platform connects sellers, buyers, and qualified mechanics, ensuring transparency and reliability
                            during vehicle inspections.
                        </p>
                        <ul style={{ textAlign: 'left', listStyleType: 'disc', paddingLeft: '20px' }}>
                            <li>Vehicle Inspection Scheduling</li>
                            <li>Qualified Mechanic Directory</li>
                            <li>Inspection Report Generation</li>
                            <li>Vehicle Advertisement Posting</li>
                            <li>Inspection Request Management</li>
                            <li>Mechanic Verification</li>
                        </ul>
                    </div>
                   
                    <div style={{ flex: '1' }}>
                        <img
                            src="../../images/blog/imageus.jpg"  // Add the path to your image here
                            alt="Team working together"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </div>
                </div>
            </section> */}



                        <section className="services-section">
                            <div className="services-container">
                                {/* Left Content */}
                                <div className="services-text">
                                    <h2>What Services Do We Provide</h2>
                                    <p>
                                        AutoAssure provides a variety of services to streamline the vehicle inspection and transaction process.
                                        Our platform connects sellers, buyers, and qualified mechanics, ensuring transparency and reliability
                                        during vehicle inspections.
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
                                    <img src="../../images/blog/imageus.jpg" alt="Team working together" />
                                </div>
                            </div>
                        </section>
          





            {/* <section style={{ padding: '40px 20px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <img src="../../images/blog/person1.jpeg"

                    style={{ width: '50%', height: '50%', marginRight: '20px' }}
                />
                <div style={{ maxWidth: '800px', textAlign: 'justify', marginRight: '30px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Our Mission</h2>
                    <p>
                        AutoAssure was created to address the challenges faced by both vehicle sellers and buyers in ensuring
                        that a proper, high-standard vehicle inspection is carried out when transferring ownership. Our platform
                        connects qualified mechanics, sellers, and buyers, ensuring transparency and reliability in the vehicle
                        inspection process. We aim to streamline the collaboration between these key players, providing a
                        one-stop solution for vehicle inspection scheduling, reporting, and certification by trusted professionals.</p>
                </div>
            </section> */}

                    <section className="section-container">
                        <img src="../../images/blog/person1.jpeg" className="section-image" />
                        <div className="text-content">
                            <h2>Our Mission</h2>
                            <p>
                                AutoAssure was created to address the challenges faced by both vehicle sellers and buyers in ensuring
                                that a proper, high-standard vehicle inspection is carried out when transferring ownership. Our platform
                                connects qualified mechanics, sellers, and buyers, ensuring transparency and reliability in the vehicle
                                inspection process. We aim to streamline the collaboration between these key players, providing a
                                one-stop solution for vehicle inspection scheduling, reporting, and certification by trusted professionals.
                            </p>
                        </div>
                    </section>




            {/* <section style={{ padding: '40px 20px', display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ maxWidth: '800px', paddingRight: '20px' }}> 
                    <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>Why AutoAssure?</h2>


                    <div style={{ maxWidth: '800px', marginLeft: '40px', paddingRight: '60px' }}>
                        <p style={{ textAlign: 'left' }}>
                            In the vehicle market, sellers need a trusted system to get certified inspections done before selling
                            their vehicle, while buyers require confidence that the car they are purchasing has been thoroughly
                            inspected. AutoAssure is designed to meet this need by:
                        </p>
                        <ul>
                            <li>Helping sellers find qualified mechanics to perform vehicle inspections.</li>
                            <li>Allowing sellers to post vehicle advertisements with or without inspection requests.</li>
                            <li>Enabling mechanics to accept or reject inspection requests in their local area.</li>
                            <li>Providing mechanics with tools to generate and share detailed inspection reports.</li>
                            <li>Ensuring all mechanics are verified through a robust qualification process.</li>
                        </ul>
                    </div>
                </div>

                <img
                    src="../../images/blog/whyus1.avif"
                    style={{ width: '50%', height: 'auto' }}  
                    alt="Why Us"
                />
            </section> */}

                <section className="section-container">
                    <div className="text-content-wrapper">
                        <h2 className="section-title">Why AutoAssure?</h2>
                        <div className="text-block">
                            <p>
                                In the vehicle market, sellers need a trusted system to get certified inspections done before selling
                                their vehicle, while buyers require confidence that the car they are purchasing has been thoroughly
                                inspected. AutoAssure is designed to meet this need by:
                            </p>
                            <ul>
                                <li>Helping sellers find qualified mechanics to perform vehicle inspections.</li>
                                <li>Allowing sellers to post vehicle advertisements with or without inspection requests.</li>
                                <li>Enabling mechanics to accept or reject inspection requests in their local area.</li>
                                <li>Providing mechanics with tools to generate and share detailed inspection reports.</li>
                                <li>Ensuring all mechanics are verified through a robust qualification process.</li>
                            </ul>
                        </div>
                    </div>

                    <img src="../../images/blog/whyus1.avif" className="section-image" alt="Why Us" />
                </section>




            {/* <section style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#e0e0e0' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Features of AutoAssure</h2>
                <div style={{ marginLeft: '60px', marginRight: '60px', margin: 'auto', textAlign: 'left' }}>
                    <h5>
                        AutoAssure brings together the key aspects of vehicle listing and inspection under one platform, creating
                        a comprehensive solution for sellers, buyers, and mechanics alike. Our unique features include:
                    </h5>
                    <ul>
                        <li>User registration and management for both sellers and mobile mechanics.</li>
                        <li>Vehicle listing and inspection booking system.</li>
                        <li>Mobile mechanic assignment and scheduling.</li>
                        <li>Mechanic verification to ensure only qualified professionals provide inspection services.</li>
                        <li>Inspection report generation and sharing between sellers, buyers, and mechanics.</li>
                        <li>Integration with external car listing websites for easy vehicle advertisement.</li>
                        <li>Payment processing for inspection services and lead generation for mobile mechanics.</li>
                    </ul>
                </div>
            </section> */}



                    <section className="features-section">
                        <h2 className="section-title">Features of AutoAssure</h2>
                        <div className="features-content">
                            <h5>
                                AutoAssure brings together the key aspects of vehicle listing and inspection under one platform, creating
                                a comprehensive solution for sellers, buyers, and mechanics alike. Our unique features include:
                            </h5>
                            <ul>
                                <li>User registration and management for both sellers and mobile mechanics.</li>
                                <li>Vehicle listing and inspection booking system.</li>
                                <li>Mobile mechanic assignment and scheduling.</li>
                                <li>Mechanic verification to ensure only qualified professionals provide inspection services.</li>
                                <li>Inspection report generation and sharing between sellers, buyers, and mechanics.</li>
                                <li>Integration with external car listing websites for easy vehicle advertisement.</li>
                                <li>Payment processing for inspection services and lead generation for mobile mechanics.</li>
                            </ul>
                        </div>
                    </section>

            <br></br>
            <br></br>
            <br></br>


            {/* <section style={{ padding: '40px 20px', display: 'flex', alignItems: 'flex-start' }}>
                <img src="../../images/blog/vision.avif"

                    style={{ width: '600px', height: '300px', marginLeft: '60px', marginRight: '60px' }}
                />
                <div style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'left' }}> Our Vision</h2>
                    <p style={{ textAlign: 'justify', marginRight: '45px' }}>
                        At AutoAssure, our vision is to revolutionize the vehicle inspection process by providing
                        a platform that brings together sellers, buyers, and mechanics into one transparent ecosystem.
                        We strive to create confidence in vehicle transactions, ensuring that all parties have the tools
                        they need for a smooth, trustworthy, and efficient experience. Through innovation, verification,
                        and collaboration, AutoAssure is setting a new standard for vehicle inspections.
                    </p>
                </div>
            </section> */}




                <section className="vision-section">
                    <img src="../../images/blog/vision.avif" className="vision-image" />
                    <div className="vision-content">
                        <h2 className="section-title-left">Our Vision</h2>
                        <p>
                            At AutoAssure, our vision is to revolutionize the vehicle inspection process by providing
                            a platform that brings together sellers, buyers, and mechanics into one transparent ecosystem.
                            We strive to create confidence in vehicle transactions, ensuring that all parties have the tools
                            they need for a smooth, trustworthy, and efficient experience. Through innovation, verification,
                            and collaboration, AutoAssure is setting a new standard for vehicle inspections.
                        </p>
                    </div>
                </section>


            {/* <section style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>AutoAssure at a Glance</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px', flexWrap: 'wrap' }}>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', color: '#1F75FE' }}>100+</h3>
                        <p style={{ fontSize: '18px' }}>Certified Mechanics</p>
                    </div>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', color: '#1F75FE' }}>50+</h3>
                        <p style={{ fontSize: '18px' }}>Service Locations</p>
                    </div>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', color: '#1F75FE' }}>2,500+</h3>
                        <p style={{ fontSize: '18px' }}>Satisfied Customers</p>
                    </div>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', color: '#1F75FE' }}>500+</h3>
                        <p style={{ fontSize: '18px' }}>Vehicles Inspected Monthly</p>
                    </div>
                </div>
            </section> */}


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



            {/* <footer style={{ backgroundColor: '#D3D3D3', padding: '20px', textAlign: 'center' }}>
                <p>Discover more about our services from our leadership team.</p>
            </footer> */}

            <footer className="footer">
                <p>Discover more about our services from our leadership team.</p>
            </footer>
        </div>
    );
};

export default AboutUsDetailView;
