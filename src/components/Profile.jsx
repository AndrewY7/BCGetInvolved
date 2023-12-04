import React, { useEffect, useState } from "react";
import css from "../styles/Profile.module.css";
import { Auth, logout } from "../config/auth.jsx";
import { auth } from "../config/firebase-config.js";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user) {
    return (
      <div className={css.profileContainer}>
        <h1 className={css.profileTitle}>Profile</h1>
        <p className={css.emailText}>Email: {user.email}</p>
        <button className={css.logoutButton} onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className={css.profileTitle}>Profile</h1>
        <Auth />
      </div>
    );
  }
}
