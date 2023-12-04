import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAShfm0Hm6HA17mcAqcFxQg3YYqQD-VE78",
  authDomain: "getinvolved-72857.firebaseapp.com",
  projectId: "getinvolved-72857",
  storageBucket: "getinvolved-72857.appspot.com",
  messagingSenderId: "670834453239",
  appId: "1:670834453239:web:5414969fddaadfa99cc1f2",
  measurementId: "G-SLZY290T4J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);