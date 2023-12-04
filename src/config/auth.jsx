import { auth, googleProvider, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import css from "../styles/Profile.module.css";

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const q = query(collection(db, "events"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return [];
  }
};

export const fetchUserCommunities = async (userId) => {
  try {
    const q = query(collection(db, "ccommunities"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return communities;
  } catch (err) {
    console.error("Error fetching user communities:", err);
    return [];
  }
};

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={css.authContainer}>
      <input
        className={css.inputField}
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={css.inputField}
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={css.authButton} onClick={signIn}>
        Sign In
      </button>
      <button className={css.authButton} onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <button className={css.authButton} onClick={logout}>
        Logout
      </button>
    </div>
  );
};
