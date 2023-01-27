import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavbarSide.module.css";
import { useGlobalContext } from "../context";
import { MdKeyboardArrowDown, MdEditNote, MdAdd, MdKeyboardArrowRight, MdSpaceDashboard } from "react-icons/md";

function NavbarSide() {
  const {
    navbarSideIsOpen,
    setNavbarSideIsOpen,
    projects,
    todos,
    setViewTodos,
    openModalProject, 
    setOpenModalProject,
    viewCategory,
    setViewCategory,
    projectIsActive, 
    setProjectIsActive,
    projectViewtype, 
    setProjectviewType,
  } = useGlobalContext();




  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  // const goDiary = () => {
  //   navigate('/diary');
  // };

  const goTodo = () => {
    navigate("/todo");
  };

  const handleProjectView = (item) => {
    console.log("projectView", item.projectId);

    const arr = todos.filter((todo) => todo.projectId == item.projectId);
    console.log("filterprojectId", arr);
    setViewTodos(arr);
  };

  const handleAddNewProject = () => {
    setOpenModalProject(!openModalProject)
  } 

  const projectHandler = () => {
    setProjectIsActive(!projectIsActive)
    setViewTodos(todos)
    setViewCategory("all")
  }

  return (
    <div
      className={
        navbarSideIsOpen
          ? `${styles.navbarSideContainer} ${styles.navbarShow}`
          : styles.navbarSideContainer
      }
    >
      <div className={styles.navbarSideContents}>
        <div className={styles.navbarSideItems} onClick={goHome}>
          <MdSpaceDashboard /> Dashboard
        </div>
        <div className={styles.navbarSideItems} onClick={goTodo}>
           My Todolist
        </div>
        <div className={styles.navbarSideItems}><RxCalendar /> upcoming</div>
        <div className={styles.navbarSideItems}>filter & Labels</div>

        <div className={styles.navbarProject}>
          <div>projects</div>
          <div className={styles.navbarProjectDrop}>
          <div className={styles.navbarProjectAdd} onClick={handleAddNewProject}>
            <MdAdd />
          </div>
          <div className={styles.navbarProjectArrow} onClick={projectHandler}>
           {projectIsActive ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight /> }
          </div>
         
          </div>
        </div>
        {projects.length > 0 && projectIsActive &&
          projects.map((item) => (
            <div onClick={() => handleProjectView(item)}>
              {item.projectTitle}
            </div>
          ))}
      </div>
    </div>
  );
}

export default NavbarSide;
