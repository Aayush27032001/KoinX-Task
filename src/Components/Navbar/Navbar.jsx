import React from "react";
import styles from "./Navbar.module.scss";
import logo from "../../assets/CryptoLogo.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import HamIcon from "../../assets/HamIcon.svg";

const Navbar = () => {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navSubContainer}>
        <div className={styles.navLogo}>
          <img src={logo} alt="logo" />
          <p>Crypto Tracker</p>
        </div>
        <div className={styles.navActions}>
          <img src={SearchIcon} alt="search" />
          <img src={HamIcon} alt="ham" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
