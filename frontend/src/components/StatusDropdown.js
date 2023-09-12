import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../context";
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

function StatusDropdown({ todoForm, setTodoForm, todoId, type }) {
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

  const handleStatusChange = (option) => {
    console.log("Status change check", option);

    let todo = {
      ...todoForm,
      ["statusId"]: option.statusId,
      ["statusTitle"]: option.statusTitle,
    };

    setTodoForm(todo);
    setStatusDropdown(false);
  };

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
        {todoForm?.statusTitle == "" ? (
          <span>Status</span>
        ) : (
          <div className={styles.dropdownButton}>
            <span className={styles.dropdownButton}>
              {getMenuItem(todoForm.statusId)}
            </span>
            <span>{todoForm?.statusTitle}</span>
          </div>
        )}
      </button>
      {statusDropdown && (
        <div className={styles.statusDropdownContent} ref={statusRef}>
          {status.map((option) => (
            <div
              className={styles.statusDropdownContentItem}
              key={option.statusId}
              value={option.statusId}
              onClick={() => handleStatusChange(option)}
            >
              {getMenuItem(option.statusId)}
              {option.statusTitle}
              {todoForm?.statusId == option.statusId && <MdCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;
