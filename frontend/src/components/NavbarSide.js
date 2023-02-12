import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavbarSide.module.css";
import { useGlobalContext } from "../context";
import { MdKeyboardArrowDown, MdLabelImportant, MdAdd, MdKeyboardArrowRight, MdSpaceDashboard, MdGridView, MdLens,  MdOutlineEdit,
  MdOutlineDelete, } from "react-icons/md";
import { FaRegCalendarAlt, FaRegListAlt } from "react-icons/fa";

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
          <MdSpaceDashboard className={styles.navbarSideIcons}/> Dashboard
        </div>
        <div className={styles.navbarSideItems} onClick={goTodo}>
           <FaRegListAlt className={styles.navbarSideIcons} /> My Todolist
        </div>
        <div className={styles.navbarSideItems}><FaRegCalendarAlt className={styles.navbarSideIcons} /> upcoming</div>
        <div className={styles.navbarSideItems}><MdLabelImportant className={styles.navbarSideIcons} />filter & Labels</div>

        <div className={styles.navbarProject}>
          <div className={styles.navbarProjectTitle}><MdGridView className={styles.navbarSideIcons} /> projects</div>
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
            <div onClick={() => handleProjectView(item)} className={styles.navbarProjectMenu} >
               <MdLens className={styles.navbarSideIcons2}  />{item.projectTitle} <MdOutlineEdit /> <MdOutlineDelete />

            </div>
          ))}
      </div>
    </div> 
  );
}

export default NavbarSide;
