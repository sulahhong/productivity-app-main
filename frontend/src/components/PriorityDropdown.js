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
  MdSignalCellularAlt, 
  MdSignalCellularAlt2Bar, 
  MdSignalCellularAlt1Bar, 
  MdBlockFlipped, 
  MdErrorOutline, 
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

    // const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    // const testArray = [...todos];
    // testArray.splice(todoEditIndex, 1, todo);
    // setTodos(testArray);
    setPriorityDropdown(false);
  };

  
  const getMenuItem = (priorityId) => {
    switch (priorityId) {
      case "1":
        return <MdErrorOutline />;
      case "2":
        return <MdSignalCellularAlt />;
        case "3":
            return <MdErrorOutline />;
          case "4":
            return <MdErrorOutline />;
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
        onClick={() => setPriorityDropdown(!priorityDropdown)}
      >
        <MdOutlinedFlag />
        {todoForm?.priorityTitle == "" ? (
          <span>Priority</span>
        ) : (
          <div className={styles.dropdownButton}>
          <span className={styles.dropdownButton}>
            {getMenuItem(todoForm.priorityId)}
          </span>
          <span>{todoForm?.priorityTitle}</span>
        </div>
          
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
               {getMenuItem(option.priorityId)}
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
