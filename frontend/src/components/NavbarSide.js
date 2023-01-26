import React, { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./NavbarSide.module.css";
import { useGlobalContext } from "../context";
import { MdKeyboardArrowDown } from "react-icons/md";

function NavbarSide() {
const {navbarSideIsOpen, 
  setNavbarSideIsOpen, projects, todos, setViewTodos} = useGlobalContext();

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

  const handleProjectView = (item) => {
    console.log("projectView", item.projectId)
    
    const arr = todos.filter((todo) => todo.projectId == item.projectId)
    console.log("filterprojectId",arr)
    setViewTodos(arr)
  }

  return (
    <div className={navbarSideIsOpen ? `${styles.navbarSideContainer} ${styles.navbarShow}` : styles.navbarSideContainer }>
      <div className={styles.navbarSideContents}>
        <div className={styles.navbarSideItems} onClick={goHome}>Home</div>
        <div className={styles.navbarSideItems} onClick={goTodo}>My Todolist</div>
        <div className={styles.navbarSideItems}>today</div>
        <div className={styles.navbarSideItems} >upcoming</div>
        <div className={styles.navbarSideItems}>filter & Labels</div>

    <div className={styles.navbarProject} >
        <div>projects</div>
        <div><MdKeyboardArrowDown /></div>
      </div>
      {projects.length>0 && projects.map((item) => (
        <div onClick={() => handleProjectView(item)}>{item.projectTitle}</div>
      ))}
      </div>
    </div>
  )
}

export default NavbarSide