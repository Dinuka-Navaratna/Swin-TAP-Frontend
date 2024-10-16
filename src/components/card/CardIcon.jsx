import React from "react";
import { Link } from "react-router-dom";
const CardIcon = (props) => {
  return (
    <Link to={props.to} className="text-decoration-none">
      <div className="card text-center">
        <div className="card-body">
          {props.children}
         
          
        </div>
      </div>
    </Link>
  );
};

export default CardIcon;
