import React from "react";
import css from "../styles/Events.module.css";

const Card = ({ name, image }) => {
  return (
    <div className={css.card}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;

