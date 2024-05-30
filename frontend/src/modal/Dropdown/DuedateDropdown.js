import React, { useEffect, useState, useRef } from "react";
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
import { useGlobalContext } from "../../context";

function DuedateDropdown({ todoForm, setTodoForm, todoId, type, action }) {
  const { projects, dueDateDropdown, setDueDateDropdown } = useGlobalContext();

  let dueDateRef = useRef();

  const handleDueDateChange = (e) => {
    console.log("TODO ATTRIBUTE", e.target.value);

    const newDate = e.target.value
      ? new Date(e.target.value).toISOString()
      : "";
    let todo = {
      ...todoForm,
      dueDate: newDate,
    };

    setTodoForm(todo);
    if (todoForm._id) {
      action(todo);
    }
    setDueDateDropdown(false);
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
  }, [setDueDateDropdown]);

  const dateFormatter = (date) => {
    if (!date) return "";
    const originalDate = new Date(date);
    if (isNaN(originalDate)) return "";
    return originalDate.toISOString().substring(0, 10);
  };

  return (
    <div className={styles.parent}>
      <button
        className={styles.textBoxIconsingle}
        onClick={() => setDueDateDropdown(!dueDateDropdown)}
        key={todoForm?.dueDate}
        value={todoForm.dueDate}
      >
        <MdCalendarToday />{" "}
        {todoForm?.dueDate === null ? (
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
          value={dateFormatter(todoForm.dueDate)}
          name="dueDate"
          onChange={handleDueDateChange}
        />
      )}
    </div>
  );
}

export default DuedateDropdown;
