import React from "react";
import css from "../styles/Navbar.module.css";

export default function Navbar(props) {
  function handleClick(page) {
    props.onNavChange(page);
  }

  return (
    <>
      <nav className={css.navbar}>
        <div className={css.title}>BC GetInvolved</div>
        <div className={css.navButtonsContainer}>
          <button
            onClick={(e) => handleClick("home")}
            className={css.navButton}
          >
            Home
          </button>
          <button
            onClick={(e) => handleClick("about")}
            className={css.navButton}
          >
            About
          </button>
          <button
            onClick={(e) => handleClick("categories")}
            className={css.navButton}
          >
            Categories
          </button>
          <button
            onClick={(e) => handleClick("recommendations")}
            className={css.navButton}
          >
            Recommendations
          </button>
          <button
            onClick={(e) => handleClick("events")}
            className={css.navButton}
          >
            Events
          </button>
          <button
            onClick={(e) => handleClick("explore")}
            className={css.navButton}
          >
            Explore
          </button>
        </div>
        <button
          onClick={(e) => handleClick("profile")}
          className={css.navProfileButton}
        >
          <img
            src="https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/profile.svg?v=1701291178932"
            alt="profile"
          ></img>
        </button>
      </nav>
    </>
  );
}
