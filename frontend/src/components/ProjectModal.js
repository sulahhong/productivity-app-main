import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./ProjectModal.module.css";

function ProjectModal() {
  const {
    setOpenModalProject,
    projects,
    setProjects,
    targetProjectGlobal,
    setTargetProjectGlobal,
    isEditingProject,
    setIsEditingProject,
  } = useGlobalContext();
  const [projectForm, setProjectForm] = useState({
    projectId: "",
    projectTitle: "",
    projectDescription: "",
  });
  const { projectId, projectTitle, projectDescription } = projectForm;

  const handleCreateProject = () => {
    if (projectTitle.length < 1) {
      alert("프로젝트 제목을 입력해주세요.");
      return;
    }
    const projectId = uuidv4();
    console.log(projectId);
    console.log("projectform", projectForm);
    setProjectForm((prevState) => ({
      ...prevState,
      projectId,
    }));
  };

  useEffect(() => {
    console.log("projects", projects);
  }, [projects]);

  const handleEditProjectModal = () => {
    const projectEditIndex = projects.findIndex(
      (item) => item.projectId == projectId
    );
  };

  const handleProjectChange = (e) => {
    console.log("namename", e.target.value);
    setProjectForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewProject = () => {
    console.log("gg", projectForm);

    setProjects([ ...projects, projectForm]);
    setOpenModalProject(false);
  };

  useEffect(() => {
    if (!isEditingProject) {
      if (projectId) {
        console.log("xxx", projectForm);
        createNewProject();
      }
      console.log("i run run");
    }
  }, [projectId]);

  const closeModalProject = () => {
    setOpenModalProject(false);
    // setTargetTodoGlobal({});
    // setIsEditingTodo(false);
  };

  return (
    <div className={styles.ProjectModalOverlay}>
      <div className={styles.ProjectModalContainer}>
        <div className={styles.ProjectModalHeader}>
          <div className={styles.ProjectModalHeaderTitle}>New Project</div>
          <button
            className={styles.ProjectModalCloseButton}
            onClick={closeModalProject}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className={styles.ProjectModalBody}>
          <div className={styles.ProjectModalInput}>
            <input
              className={styles.ProjectModalInputTitle}
              name="projectTitle"
              placeholder="title"
              value={projectTitle}
              onChange={handleProjectChange}
            />
            <input
              className={styles.ProjectModalInputDescription}
              placeholder="Description"
              name="projectDescription"
              value={projectDescription}
              onChange={handleProjectChange}
            />
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
