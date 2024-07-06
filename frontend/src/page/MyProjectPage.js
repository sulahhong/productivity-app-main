import React, { useState, useContext, useEffect } from "react";
import styles from "../page/MyWorkspacePage.module.css";
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft, MdOutlineSettings } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import MySingleProjectItem from "./MySingleProjectItem";

function MyProjectPage() {
  const {
    project,
    getProjectByWspace,
    setOpenProjectModal,
    setCurrentWorkspace,
  } = useGlobalContext();
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getProjectByWspace(slug);
    setCurrentWorkspace(slug);
  }, []);

  const handleGoBack = () => {
    navigate("/myworkspace");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <div className={styles.todoBody}>
        <div className={styles.todoGuideBar}>
          <div className={styles.todoGuideBarLeftside}>
            <button
              className={styles.todoGuideBarLeftItem}
              onClick={() => handleGoBack()}
            >
              <MdKeyboardArrowLeft />
            </button>
            <span className={styles.todoGuideBarLeftText}>My Projects</span>
          </div>

          <div>
            <button
              className={styles.todoAddButton}
              onClick={() => setOpenProjectModal(true)}
            >
              <MdAdd className={styles.todoAddIcon} />
              Add
            </button>
          </div>
        </div>
        <div className={styles.wspaceContent}>
      {project?.length > 0 ? (
        project.map((item) => (
        <MySingleProjectItem item={item} key={item._id} />)))
        : null}
        </div>
      </div>
    </div>
    </div>
  );
}

export default MyProjectPage;
