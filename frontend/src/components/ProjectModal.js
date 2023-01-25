import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./TodoModal.module.css";

function ProjectModal() {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    targetTodoGlobal,
    setTargetTodoGlobal,
    setIsEditingTodo,
    isEditingTodo,
    openModalProject,
    setOpenModalProject,

  } = useGlobalContext();
  const [projectForm, setProjectForm] = useState({
    projectId: "",
    projectTitle: "",
    projectDescription: "",
  
  });
  const {
    projectId,
    projectTitle,
    projectDescription,
  
  } = projectForm;


  const handleCreateProject = () => {

    const projectId = uuidv4();
    console.log(projectId);
    console.log("projectform", projectForm);
    setProjectForm((prevState) => ({
      ...prevState,
      projectId,
    }));
    // setOpenModal(false)
  };

  const handleProjectChange = (e) => {
    // console.log("namename", e.target.value)
    setProjectForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }


  const createNewProject = () => {
    console.log("gg", projectForm);

  };

  // useEffect(() => {
  //   if (!isEditingTodo) {
  //     if (todoCreateDate && todoId) {
  //       console.log("xxx", todoForm);
  //       createNewTodo();
  //     }
  //     console.log("i run");
  //   }
  // }, [todoCreateDate, todoId]);

  const closeModalProject = () => {
    setOpenModalProject(false);
    // setTargetTodoGlobal({});
    // setIsEditingTodo(false);
  };

  return (
    <div className={styles.todoModalOverlay}>
      <div className={styles.todoModalContainer}>
        <div className={styles.todoModalHeader}>
          <div className={styles.todoModalHeaderTitle}>New Project</div>
          <button className={styles.todoModalCloseButton} onClick={closeModalProject}>
            X
          </button>
        </div>
        <div className={styles.todoModalBody}>
          <div className={styles.todoModalInput}>
            <input
              className={styles.todoModalInputTitle}
              name="projectTitle"
              placeholder="title"
              value={projectTitle}
              onChange={handleProjectChange}
            />
            <input
              className={styles.todoModalInputDescription}
              placeholder="Description"
              name="projectDescription"
              value={projectDescription}
              onChange={handleProjectChange}
            />
          </div>
          <div className={styles.todoModalAddTodocontainer}>           
              <button
                className={styles.todoModalAddTodo}
                onClick={() => handleCreateProject()}
              >
                Add
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
