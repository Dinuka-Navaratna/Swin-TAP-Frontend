import React, { lazy } from "react";
const Line = lazy(() => import("../others/Line"));

const About = (props) => {
  return (
    <div
      className={`p-4 mb-3 bg-light rounded ${
        props.className ? props.className : ""
      }`}
    >
      <h4 className="fst-italic">{props.title}</h4>
      <Line className="mb-2" />
      <p className="mb-0">
      Whether you're buying or selling, ensure a smooth transaction with our comprehensive vehicle inspection service. As a buyer, gain peace of mind with a thorough check by our professional mobile mechanics, ensuring your purchase is a wise one. As a seller, make your car stand out and sell faster by showcasing a certified report that gives potential buyers the confidence they need. Get your vehicle inspected today and drive your deal forward with assurance.
      </p>
    </div>
  );
};
export default About;
