import React from 'react'

import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from "./components/three_page/Navbar/Navbar";
import Home from "./components/landing_page/Home/Home";
import Footer from "./components/landing_page/Footer/Footer";
import styles from "./App.module.css";

import THome from "./components/three_page/Home/Home";
import ThreePage from "./components/three_page/Home/Home"; // ✅ Add this!




// const App = () => (
//   <div className={styles.app}>
//     <Navbar />
//     <Home />
//     <Footer />
//   </div>
// );

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

const ThreeApp = () => (
  <div className={styles.app}>
    <Navbar />
    <ThreePage />
    <Footer />
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/user/:tab" element={<ThreeApp />} />
  </Routes>
);

export default App;