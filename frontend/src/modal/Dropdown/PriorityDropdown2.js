import React, { useEffect, useState, useRef } from "react";
import styles from "../Dropdown/PriorityDropdown.module.css";
import {
  MdOutlineClose,
  MdOutlinedFlag,
  MdCheck,
  MdBlockFlipped,
  MdErrorOutline,
} from "react-icons/md";
import { FaSignal } from "react-icons/fa";
import { CgSignal } from "react-icons/cg";
import { useGlobalContext } from "../../context";

function PriorityDropdown2({ todo, onUpdate }) {
  const { priority } = useGlobalContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const priorityRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!priorityRef.current?.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriorityChange = (option) => {
    const updatedTodo = {
      ...todo,
      priority: option,
    };
    onUpdate(updatedTodo);
    setDropdownVisible(false);
  };

  const getMenuItem = (priorityId) => {
    switch (priorityId.toString()) {
			case "0":
        return <MdErrorOutline />;
      case "1":
        return <MdErrorOutline />;
      case "2":
        return <FaSignal />;
      case "3":
        return <CgSignal />;
      case "4":
        return <CgSignal />;
      case "5":
        return <MdBlockFlipped />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.parent} ref={priorityRef}>
      <button
        className={styles.textBoxIconsingle}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {todo.priority?.sid === "0" ? (
          <>
            <MdOutlinedFlag /> <span>Priority</span>
          </>
        ) : (
          <div className={styles.dropdownButton}>
            <span className={styles.dropdownButton}>
              {getMenuItem(todo.priority.sid)}
            </span>
            <span>{todo.priority.title}</span>
          </div>
        )}
      </button>
      {dropdownVisible && (
        <div className={styles.priorityDropdownContent}>
          {priority.map((option) => (
            <div
              className={styles.priorityDropdownContentItem}
              key={option.sid}
              onClick={() => handlePriorityChange(option)}
            >
              {getMenuItem(option.sid)}
              {option.title}
              {todo.priority?.sid === option.sid && <MdCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriorityDropdown2;
