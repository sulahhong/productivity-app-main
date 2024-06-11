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

function StatusDropdown2({ todo, onUpdate }) {
  const { status } = useGlobalContext();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  let statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!statusRef.current?.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (option) => {
    const updatedTodo = {
      ...todo,
      status: option,
    };
    onUpdate(updatedTodo);
    setDropdownVisible(false);
  };

  const getMenuItem = (statusId) => {
    switch (statusId.toString()) {
      case "0":
        return <MdPauseCircleOutline />;
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
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {todo?.status.sid === "0" ? (
          <span>Status</span>
        ) : (
          <div className={styles.dropdownButton}>
            <span className={styles.dropdownButton}>
              {getMenuItem(todo?.status.sid)}
            </span>
            <span>{todo?.status.title}</span>
          </div>
        )}
      </button>
      {dropdownVisible && (
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
              {todo?.status.sid === option.sid && <MdCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusDropdown2;
