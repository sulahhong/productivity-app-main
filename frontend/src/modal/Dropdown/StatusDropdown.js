import React, { useEffect, useState, useRef } from "react";

import styles from "./StatusDropdown.module.css";
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
  MdOutlineCircle,
  MdBlockFlipped,
  MdCheckCircleOutline,
  MdGroupWork,
  MdPauseCircleOutline,
} from "react-icons/md";
import { useGlobalContext } from "../../context";

function StatusDropdown2({ todoForm, setTodoForm, type, action }) {
  const {
    status,
    setStatus,
    todos,
    setTodos,
    statusDropdown,
    setStatusDropdown,
  } = useGlobalContext();

  let statusRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!statusRef.current?.contains(e.target)) {
        setStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  

  const handleStatusChange = async(option) => {
    console.log("Status change check", option);

    let todo = {
      ...todoForm,
      ["status"]: option,

    };

    
    await setTodoForm(todo);


    if(todoForm._id){
      action(todo)
    }
    setStatusDropdown(false);
  };

  // const handleStatusChange = (option) => {
  //   console.log("Status change check", option);

  //   let todo = {
  //     ...todoForm,
  //     ["status"]: option,

  //   };

  //   setTodoForm(todo);
  //   setStatusDropdown(false);
  // };

  const getMenuItem = (statusId) => {
    switch (statusId) {
      case "1":
        return <MdPauseCircleOutline />;
      case "2":
        return <MdOutlineCircle />;
      case "3":
        return <MdGroupWork />;
      case "4":
        return <MdCheckCircleOutline />;
      case "5":
        return <MdBlockFlipped />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.parent}>
      <button
        className={styles.textBoxIconsingle}
        onClick={() => setStatusDropdown(!statusDropdown)}
      >
        {todoForm?.status.sid == "0" ? (
          <span>Status</span>
        ) : (
          <div className={styles.dropdownButton}>
            <span className={styles.dropdownButton}>
              {getMenuItem(todoForm.status.sid)}
            </span>
            <span>{todoForm?.status.title}</span>
          </div>
        )}
      </button>
      {statusDropdown && (
        <div className={styles.statusDropdownContent} ref={statusRef}>
          {status.map((option) => (
            <div
              className={styles.statusDropdownContentItem}
              key={option.sid}
              value={option.sid}
              onClick={() => handleStatusChange(option)}
            >
              {getMenuItem(option.sid)}
              {option.title}
              {todoForm?.status.sid == option.sid && <MdCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusDropdown2;
