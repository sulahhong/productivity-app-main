import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import styles from "./DuedateDropdown.module.css";
import {
    MdOutlineClose,
    MdCalendarToday,
    MdOutlinedFlag,
    MdSort,
    MdGridView,
    MdRadioButtonUnchecked,
    MdOutlineCheckCircleOutline,
    MdDelete,
    MdModeEdit,
    MdAdd,
    MdKeyboardArrowDown,
    MdCheck,
    MdKeyboardArrowLeft,
    MdVerticalSplit,
  } from "react-icons/md";

function DuedateDropdown({todoForm, setTodoForm, todoId, type}) {

    const {
        projects,
        dueDateDropdown,
        setDueDateDropdown,
  
      } = useGlobalContext();

      let dueDateRef = useRef();

      const handleTodoChange = (e) => {
        console.log("TODO ATTRIBUTE", e.target.name);
        if (e.target.name == "projectId") {
          const findProject = projects.filter(
            (item) => item.projectId == e.target.value
          );
          console.log("FIND PROJECT", findProject[0].projectTitle);
    
          //method  A
          setTodoForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            ["projectTitle"]: findProject[0].projectTitle,
          }));
    
          //method B
          // let projectTitle= findProject[0].projectTitle
    
          // setTodoForm((prevState) => ({
          //   ...prevState,
          //   [e.target.name]: e.target.value,
          //   projectTitle
          // }));
        } else {
          setTodoForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
        }
      };

      useEffect(() => {
        let handler = (e) => {
          if (!dueDateRef.current.contains(e.target)) {
            setDueDateDropdown(false);
          }
        };
        document.addEventListener("mousedown", handler);
    
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      });


  return (
    <div className={styles.parent}>
        <button
              className={styles.textBoxIconsingle}
              onClick={() => setDueDateDropdown(!dueDateDropdown)}
              key={todoForm?.todoDueDate}
              value={todoForm.todoDueDate}
            >
              <MdCalendarToday />{" "}
              {todoForm?.todoDueDate == "" ? (
                <span>Date</span>
              ) : (
                <span>{todoForm.todoDueDate}</span>
              )}
            </button>
            {dueDateDropdown && (
              <input
                ref={dueDateRef}
                className={styles.dueDateDropdownContent}
                type="date"
                value={todoForm?.todoDueDate}
                name="todoDueDate"
                onChange={handleTodoChange}
              />
            )}
    </div>
  )
}

export default DuedateDropdown