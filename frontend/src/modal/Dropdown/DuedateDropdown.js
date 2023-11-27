import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
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
import { useGlobalContext } from '../../context';

function DuedateDropdown({todoForm, setTodoForm, todoId, type, action}) {

    const {
        projects,
        dueDateDropdown,
        setDueDateDropdown,
  
      } = useGlobalContext();

      let dueDateRef = useRef();

      const handleDueDateChange = (e) => {
        console.log("TODO ATTRIBUTE", e.target.value);

        let todo = {
          ...todoForm, 
          ["dueDate"]: e.target.value,
        }

        setTodoForm(todo)
        if(todoForm._id){
          action(todo)
        }
        setDueDateDropdown(false)
        // if (e.target.name == "projectId") {
        //   const findProject = projects.filter(
        //     (item) => item.projectId == e.target.value
        //   );
        //   console.log("FIND PROJECT", findProject[0].projectTitle);
    
        //   //method  A
        //   setTodoForm((prevState) => ({
        //     ...prevState,
        //     [e.target.name]: e.target.value,
        //     ["projectTitle"]: findProject[0].projectTitle,
        //   }));
    
        //   //method B
        //   // let projectTitle= findProject[0].projectTitle
    
        //   // setTodoForm((prevState) => ({
        //   //   ...prevState,
        //   //   [e.target.name]: e.target.value,
        //   //   projectTitle
        //   // }));
        // } else {
        //   setTodoForm((prevState) => ({
        //     ...prevState,
        //     [e.target.name]: e.target.value,
        //   }));
        // }
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


      const dateFormatter = (date) => {
        const originalDate = new Date(date)
        
        const formattedDate = originalDate.toISOString().substring(0, 10)
    
        return formattedDate;
      }


  return (
    <div className={styles.parent}>
        <button
              className={styles.textBoxIconsingle}
              onClick={() => setDueDateDropdown(!dueDateDropdown)}
              key={todoForm?.dueDate}
              value={todoForm.dueDate}
            >
              <MdCalendarToday />{" "}
              {todoForm?.dueDate == "" ? (
                <span>Date</span>
              ) : (
                <span>{dateFormatter(todoForm.dueDate)}</span>
              )}
            </button>
            {dueDateDropdown && (
              <input
                ref={dueDateRef}
                className={styles.dueDateDropdownContent}
                type="date"
                value={todoForm?.dueDate}
                name="dueDate"
                onChange={handleDueDateChange}
              />
            )}
    </div>
  )
}

export default DuedateDropdown