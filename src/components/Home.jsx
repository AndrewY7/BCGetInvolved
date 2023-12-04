import React from "react";
import css from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={css.home}>
      <h1 className={css.homeTitle}>BC GetInvolved</h1>
      <p className={css.homeDescription}>
        Explore your interests, discover new communities, and connect with
        fellow students at Boston College.
      </p>
    </div>
  );
}
