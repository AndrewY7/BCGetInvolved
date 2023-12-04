import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase-config.js";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import css from "../styles/Explore.module.css";

export default function Explore() {
  const [eventList, setEventList] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sports");
  const [imageUpload, setImageUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const eventsCollectionRef = collection(db, "events");

  const categories = [
    "Sports",
    "Music",
    "Extracurriculars",
    "Studies",
    "Miscellaneous",
  ];

  const getEventList = async () => {
    try {
      const q = query(eventsCollectionRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      setEventList(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  const uploadFile = async () => {
    if (!imageUpload)
      return "https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/boston_college_eagles_logo_primary_dark_20008893.png?v=1701666477385";
    setUploading(true);
    const imageRef = ref(storage, `eventImages/${imageUpload.name + uuidv4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const imageUrl = await getDownloadURL(snapshot.ref);
      setUploading(false);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      return "https://cdn.glitch.global/76a4eac1-22f8-4a89-87b8-4060973f302f/boston_college_eagles_logo_primary_dark_20008893.png?v=1701666477385";
    }
  };

  const onSubmitEvent = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      const imageUrl = await uploadFile();
      await addDoc(eventsCollectionRef, {
        title: newEventTitle,
        category: selectedCategory,
        date: serverTimestamp(),
        imageUrl: imageUrl,
        userName: auth.currentUser ? auth.currentUser.displayName : "Anonymous",
      });
      getEventList();
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  const deleteEvent = async (id, imageUrl) => {
    const eventDocRef = doc(db, "events", id);
    try {
      await deleteDoc(eventDocRef);
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      getEventList();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className={css.exploreContainer}>
      <h1>Create an Event</h1>
      <div>
        <input
          className={css.input}
          placeholder="Event title..."
          onChange={(event) => setNewEventTitle(event.target.value)}
        />
        <select
          className={css.select}
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <input
          className={css.input}
          type="file"
          onChange={(event) => setImageUpload(event.target.files[0])}
        />
        <button
          className={css.button}
          onClick={onSubmitEvent}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit Event"}
        </button>
      </div>
      <div>
        <h2>Events</h2>
        {eventList.map((event) => (
          <div key={event.id} className={css.event}>
            <h3>{event.title}</h3>
            <p>Category: {event.category}</p>
            <p>Posted by: {event.userName}</p>
            <p>Date: {event.date?.toDate().toLocaleString() || "Loading..."}</p>
            <img
              src={event.imageUrl}
              alt={event.title}
              className={css.eventImage}
            />
            <button
              className={css.deleteButton}
              onClick={() => deleteEvent(event.id, event.imageUrl)}
            >
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
