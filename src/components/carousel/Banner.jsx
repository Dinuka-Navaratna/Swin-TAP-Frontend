import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Item = ({ item, index }) => (
  <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
    <Link to={item.to}>
      <img src={item.img} className="img-fluid" alt={item.title} />
      {(item.title || item.description) && (
        <div className="carousel-caption d-none d-md-block">
          {item.title && <h5>{item.title}</h5>}
          {item.description && <p>{item.description}</p>}
        </div>
      )}
    </Link>
  </div>
);

const Indicator = ({ item, index }) => (
  <li
    data-bs-target={`#${item}`}
    data-bs-slide-to={index}
    className={`${index === 0 ? "active" : ""}`}
  />
);

const Banner = (props) => {
  return (
    <div
      id={props.id}
      className={`carousel slide ${props.className}`}
      data-bs-ride="carousel"
      style={{ minHeight: 100 }}
    >
      <ol className="carousel-indicators">
        {props.data.map((item, index) => (
          <Indicator item={props.id} index={index} key={index} />
        ))}
      </ol>
      <div className="carousel-inner">
        {props.data.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </div>
     
    </div>
  );
};

export default Banner;
