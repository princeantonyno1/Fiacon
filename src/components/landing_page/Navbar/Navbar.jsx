import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.png";
const Navbar = () => (
  <header className={styles.navbar}>
    <div className={styles.logoWrapper}>
      <img src={logo} alt="Fiacon Logo" className={styles.logo} />
    </div>
    <button className={styles.menuButton}>
      <span className={styles.menuIcon}>&#9776;</span>
    </button>
  </header>
);

export default Navbar;
