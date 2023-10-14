import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./ProjectModal.module.css";

function ProjectModal() {
  const {
    openProjectModal, setOpenProjectModal, project, createProject, getProjectByWspace, currentWorkspace
  } = useGlobalContext();

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    identifier: "",
    publicYn: true, 
  });
  const { title, description, identifier, publicYn } = projectForm;

useEffect(() => {
  console.log("SLUGGG", currentWorkspace)
}, [])

  const handleProjectChange = (e) => {
    setProjectForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
   
    }));
  }

  const handleProjectChange2 = () => {
    setProjectForm((prevState) => ({
      ...prevState,
      publicYn: !projectForm.publicYn,
   
    }));
  }

 

  const closeModal = () => {
    setOpenProjectModal(false)
  }

  const handleCreateProject = async() => {
    const success = await createProject(projectForm, currentWorkspace)

    if(success) {
      await setOpenProjectModal(false)
      await getProjectByWspace(currentWorkspace)
    }

  }

  return (
    <div className={styles.ProjectModalOverlay}>
      <div className={styles.ProjectModalContainer}>
        <div className={styles.ProjectModalHeader}>
          <div className={styles.ProjectModalHeaderTitle}>New Project</div>
          <button
            className={styles.ProjectModalCloseButton}
            onClick={closeModal}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className={styles.ProjectModalBody}>
          <div className={styles.ProjectModalInput}>
            <input
              className={styles.ProjectModalInputTitle}
              name="title"
              placeholder="title"
              value={title}
              onChange={handleProjectChange}
            />
            <input
              className={styles.ProjectModalInputDescription}
              placeholder="description"
              name="description"
              value={description}
              onChange={handleProjectChange}
            />
            <input
              className={styles.ProjectModalInputDescription}
              placeholder="identifier"
              name="identifier"
              value={identifier}
              onChange={handleProjectChange}
            />
            <label>
            publicYn
            <input type="checkbox" name="publicYn" checked={publicYn}  value={publicYn} onChange={handleProjectChange2} />
            </label>
          </div>
          <div className={styles.ProjectModalAddTodocontainer}>
            <button
              className={styles.ProjectModalAddTodo}
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
