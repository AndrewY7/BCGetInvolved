import React, { useEffect, useState } from "react";
import css from "../styles/Categories.module.css";
import { db, auth } from "../config/firebase-config.js";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Categories() {
  const [communityList, setCommunityList] = useState([]);
  const [newCommunityTitle, setCommunityTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sports");
  const communitiesCollectionRef = collection(db, "communities");
  const [errorMessage, setErrorMessage] = useState("");

  const getCommunityList = async () => {
    try {
      const data = await getDocs(communitiesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCommunityList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCommunityList();
  }, []);

  const onSubmitCommunity = async () => {
    if (!auth.currentUser) {
      setErrorMessage("You must be logged in to submit a community.");
      return;
    }

    try {
      const newCommunity = {
        title: newCommunityTitle,
        category: selectedCategory,
        dateAdded: new Date().toISOString().split("T")[0],
        userId: auth.currentUser.uid,
      };
      await addDoc(communitiesCollectionRef, newCommunity);

      getCommunityList();
    } catch (error) {
      console.error("Error adding community:", error);
    }
  };

  const deleteCommunity = async (id) => {
    try {
      await deleteDoc(doc(db, "communities", id));
      getCommunityList();
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  const categories = [
    "sports",
    "music",
    "extracurriculars",
    "studies",
    "miscellaneous",
  ];

  return (
    <>
      <div className={css.title}>
        <h1>Categories</h1>
      </div>
      <div className={css.select}>
        <input
          placeholder="Community title..."
          onChange={(e) => setCommunityTitle(e.target.value)}
          className={css.input}
        />
        <div className={css.customSelect}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={css.selectBox}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <span className={css.selectArrow}></span>
        </div>
        <button onClick={onSubmitCommunity} className={css.submitButton}>
          Submit Community
        </button>
      </div>
      <div className={css.categories}>
        {categories.map((category) => (
          <div key={category} className={css.category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className={css.item}>
              {communityList
                .filter((community) => community.category === category)
                .map((community) => (
                  <div key={community.id} className={css.community}>
                    <h3>{community.title}</h3>
                    <p>Date: {community.dateAdded}</p>
                    <button
                      onClick={() => deleteCommunity(community.id)}
                      className={css.deleteButton}
                    >
                      Delete Community
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
