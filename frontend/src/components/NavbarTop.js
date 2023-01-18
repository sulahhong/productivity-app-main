import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./NavbarTop.module.css";
import { MdMenu } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

function NavbarTop() {


  return (
    <div className={styles.navbarTopContainer}>
      <div className={styles.navbarTopLeft} ><AiOutlineMenu size={20} /></div>
      <div></div>
    </div>
  )
}

export default NavbarTop