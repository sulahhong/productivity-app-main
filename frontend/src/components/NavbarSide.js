import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./NavbarSide.module.css";

function NavbarSide() {
  return (
    <div className={styles.navbarSideContainer}>
      <div className={styles.navbarSideContents}>
        <div className={styles.navbarSideItems}>text</div>
        <div className={styles.navbarSideItems}>text</div>
        <div className={styles.navbarSideItems}>text</div>
        <div className={styles.navbarSideItems}>text</div>
        <div className={styles.navbarSideItems}>text</div>
      </div>
    </div>
  )
}

export default NavbarSide