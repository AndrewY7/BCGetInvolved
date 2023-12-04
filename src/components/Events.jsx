import React from "react";
import css from "../styles/Events.module.css";
import Card from "../components/Card.jsx";

export default function Events() {
  return (
    <>
      <div className={css.events}>
        <h1>Events at Boston College!</h1>
        <div className={css.container}>
          <h2>Hockey Game vs. UConn</h2>
          <Card
            image="https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/big_AG8I4782%20(1).jpg?v=1700426195112"
          />
        </div>
        <div className={css.container}>
          <h2>Econometrics Seminar</h2>
          <Card
            image="https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/e7b8eb9ea27e6fb32c3dbb3cdac7f640f82a2083.jpg?v=1700426790781"
          />
        </div>
        <div className={css.container}>
          <h2>Following the Star</h2>
          <Card
            image="https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/9d987b746c56bf3144a45a48d9e8aa7251d1324e.jpg?v=1700427040251"
          />
        </div>
        <div className={css.container}>
          <h2>BC Breakfast Club</h2>
          <Card
            image="https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/4d95aeb31e2fe29aded6c6207358ceda9c234416.jpg?v=1700427252181"
          />
        </div>
      </div>
    </>
  );
}
