import React, { useState } from "react";

import Footer from "./components/Footer.jsx";
import Seo from './components/seo.jsx';
import Categories from './components/Categories.jsx';
import Events from './components/Events.jsx';
import Explore from './components/Explore.jsx';
import Recommendations from './components/Recommendations.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx';
import css from "./styles/App.module.css";
import Profile from "./components/Profile.jsx";
import "./styles/index.css";


export default function App() {
    
  const [page, setPage] = useState("home");
  
  function renderMain(page) {
    switch (page) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "categories":
        return <Categories />;
      case "recommendations":
        return <Recommendations />;
      case "events":
        return <Events />;
      case "explore":
        return <Explore />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  }
  
  return (
    <>
      <Seo />
      <div className={css.container}>
        <Navbar onNavChange={setPage} />
        <main className={css.content}>
          {renderMain(page)}
        </main>
        <Footer />
      </div>
    </>
  );
}
