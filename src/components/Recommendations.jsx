import React from 'react';
import css from "../styles/Recommendations.module.css";

const Recommendations = () => {
  return (
    <div className={css.recommendations}>
      <h1>Recommendations</h1>
      <ul>
        <li>
          <h2>Communities your friends are a part of</h2>
          <ul>
            <li>BC Basketball Club</li>
            <li>BC Music Society</li>
            <li>BC Computer Science Club</li>
          </ul>
        </li>
        <li>
          <h2>Categories you might be interested in</h2>
          <ul>
            <li>Arts and Crafts</li>
            <li>Dance</li>
            <li>Food and Culture</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Recommendations;
