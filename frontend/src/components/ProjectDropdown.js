import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import styles from "./ProjectDropdown.module.css";
import { MdGridView, MdCheck } from "react-icons/md";

function ProjectDropdown({ todoForm, setTodoForm, todoId, type }) {
  const { projects, projectDropdown, setProjectDropdown } = useGlobalContext();

  let projectRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!projectRef.current.contains(e.target)) {
        setProjectDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleProjectMenuChange = (option) => {
    setTodoForm((prevState) => ({
      ...prevState,
      ["projectId"]: option.projectId,
      ["projectTitle"]: option.projectTitle,
    }));
    setProjectDropdown(false);
  };

  return (
    <div className={styles.parent}>
      <button
        className={styles.textBoxIconsingle}
        onClick={() => setProjectDropdown(!projectDropdown)}
      >
        <MdGridView />{" "}
        {todoForm.projectTitle == "No project" ? (
          <span>No project</span>
        ) : (
          <span>{todoForm.projectTitle}</span>
        )}
      </button>
      {projectDropdown && (
        <div className={styles.projectDropdownContent} ref={projectRef}>
          {projects.length > 0 &&
            projects.map((option) => (
              <div
                className={styles.projectDropdownItem}
                key={option.projectId}
                value={option.projectId}
                onClick={() => handleProjectMenuChange(option)}
              >
                {option.projectTitle}{" "}
                {todoForm.projectId == option.projectId && <MdCheck />}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProjectDropdown;
