import React from "react";
import "./Card.css";
const Card = ( {props} ) => {

   
  return (
    <div className="image-card">
      <img className="image-prev" src={props.previewURL} alt={props.tags} />

    </div>
  );
};

export default Card;
