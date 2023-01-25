import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./NavbarTop.module.css";
import { MdMenu } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { useGlobalContext } from "../context";

function NavbarTop() {
  const { navbarSideIsOpen, setNavbarSideIsOpen } = useGlobalContext();

  const handleNavbarSide = () => {
    setNavbarSideIsOpen(!navbarSideIsOpen);
  };

  return (
    <div className={styles.navbarTopContainer}>
      <div className={styles.navbarTopLeft} onClick={handleNavbarSide}>
        <AiOutlineMenu size={20} />
      </div>
      <div></div>
    </div>
  );
}

export default NavbarTop;
