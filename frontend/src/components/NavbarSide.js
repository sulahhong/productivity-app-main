import React, { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./NavbarSide.module.css";
import { useGlobalContext } from "../context";

function NavbarSide() {
const {navbarSideIsOpen, 
  setNavbarSideIsOpen,} = useGlobalContext();

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  // const goDiary = () => {
  //   navigate('/diary');
  // };

  const goTodo = () => {
    navigate('/todo')
  }

  return (
    <div className={navbarSideIsOpen ? `${styles.navbarSideContainer} ${styles.navbarShow}` : styles.navbarSideContainer }>
      <div className={styles.navbarSideContents}>
        <div className={styles.navbarSideItems} onClick={goHome}>Home</div>
        <div className={styles.navbarSideItems} onClick={goTodo}>My Todolist</div>
        <div className={styles.navbarSideItems}>today</div>
        <div className={styles.navbarSideItems} >upcoming</div>
        <div className={styles.navbarSideItems}>filter & Labels</div>
      </div>
    </div>
  )
}

export default NavbarSide