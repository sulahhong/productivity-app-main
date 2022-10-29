import React, { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./NavbarSide.module.css";

function NavbarSide() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goDiary = () => {
    navigate('/diary');
  };

  const goTodo = () => {
    navigate('/todo')
  }

  return (
    <div className={styles.navbarSideContainer}>
      <div className={styles.navbarSideContents}>
        <div className={styles.navbarSideItems} onClick={goHome}>Home</div>
        <div className={styles.navbarSideItems} onClick={goDiary}>My diary</div>
        <div className={styles.navbarSideItems} onClick={goTodo}>My Todolist</div>
        <div className={styles.navbarSideItems}>text</div>
        <div className={styles.navbarSideItems}>text</div>
      </div>
    </div>
  )
}

export default NavbarSide