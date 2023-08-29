import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../page/TodoSinglePage.module.css";
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
import { useGlobalContext } from "../context";

function PriorityDropdown({ todoForm, setTodoForm, todoId, type }) {
  const { todos, setTodos, priorityDropdown, setPriorityDropdown, priority } =
    useGlobalContext();

  let priorityRef1 = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!priorityRef1.current?.contains(e.target)) {
        setPriorityDropdown(false);
      }
      console.log("ppppmmmm", e.target);
      console.log("ppmmm2222", priorityRef1.current);
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handlePriorityMenuChange = (option) => {
    // setTodoForm((prevState) => ({
    //   ...prevState,
    //   ["priorityId"]: option.priorityId,
    //   ["prorityTitle"]: option.priorityTitle,
    // }));

    let todo = {
      ...todoForm,
      ["priorityId"]: option.priorityId,
      ["priorityTitle"]: option.priorityTitle,
    };

    setTodoForm(todo);
    console.log("CHNAGE PRIO: ", todo);

    const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    const testArray = [...todos];
    testArray.splice(todoEditIndex, 1, todo);
    setTodos(testArray);
    setPriorityDropdown(false);
  };

  return (
    <div className={styles.parent}>
      <button
        className={styles.textBoxIconsingle}
        onClick={() => setPriorityDropdown(!priorityDropdown)}
      >
        <MdOutlinedFlag />
        {todoForm?.priorityTitle == "" ? (
          <span>Priority</span>
        ) : (
          <span>{todoForm?.priorityTitle}</span>
        )}
      </button>
      {priorityDropdown && (
        <div className={styles.priorityDropdownContent} ref={priorityRef1}>
          {priority.map((option) => (
            <div
              className={styles.priorityDropdownContentItem}
              key={option.priorityId}
              value={option.priorityId}
              onClick={() => handlePriorityMenuChange(option)}
            >
              {option.priorityTitle}
              {todoForm?.priorityId == option.priorityId && <MdCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriorityDropdown;
