import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Dropdown/PriorityDropdown.module.css";
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
import { useGlobalContext } from "../../context";


function PriorityDropdown({ todoForm, setTodoForm, todoId, type, action }) {
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

    let todo = {
      ...todoForm,
      ["priority"]: option,
    };

    setTodoForm(todo);
    if(todoForm._id){
      action(todo)
    }
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
        
        {todoForm?.priority.sid == "0" ? (
         <><MdOutlinedFlag /> <span>Priority</span></>
        ) : (
          <div className={styles.dropdownButton}>
          <span className={styles.dropdownButton}>
            {getMenuItem(todoForm.priority.sid)}
          </span>
          <span>{todoForm?.priority.title}</span>
        </div>
          
        )}
      </button>
      {priorityDropdown && (
        <div className={styles.priorityDropdownContent} ref={priorityRef1}>
          {priority.map((option) => (
            <div
              className={styles.priorityDropdownContentItem}
              key={option.sid}
              value={option.sid}
              onClick={() => handlePriorityMenuChange(option)}
            >
               {getMenuItem(option.sid)}
              {option.title}
              {todoForm?.priority.sid == option.sid && <MdCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriorityDropdown;
