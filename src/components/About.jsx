import React from "react";
import css from "../styles/About.module.css";

export default function About() {
  return (
    <div className={css.about}>
      <h1 className={css.title}>About Us</h1>
      <div className={css.text1}>
        <p>
          BC GetInvolved is a platform designed to help students connect with
          each other and find communities that share their interests. We believe
          that getting involved in campus life is an essential part of the
          college experience, and we want to make it as easy as possible for
          students to find the communities that are right for them.
        </p>
        <img
          src="https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/Boston_College_Eagles_logo.svg.png?v=1701371881196"
          alt="bc logo"
        ></img>
      </div>
      <h1 className={css.title}>Our Goal</h1>
      <div className={css.text2}>
        <p>
          Lots of times, there are many hobbies or interests that we have, but
          the clubs and organizations that are connected to those hobbies have
          time commitments and there just is not enough time to do all of these
          together. However, we feel that there should still be opportunities
          for students to connect outside of our schedules in order to persue
          these interests that we have. Because of this, we feel that there are
          missed opportunities for interests to be persued outside of what is
          already expected as students. We really hope that this website allows
          for more connections on our campus and more information for students
          to know about upcoming events and explore more opportunities on
          campus.
        </p>
      </div>
    </div>
  );
}