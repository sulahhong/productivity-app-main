import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styles from "./TodoView.module.css";
import { useGlobalContext } from "../context";
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdCalendarToday,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineToday,
  MdOutlineInfo,
  MdMoreHoriz,
} from "react-icons/md";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  SubMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import StatusDropdown from "./StatusDropdown";

function SingleTodoItem({ item }) {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    targetTodoGlobal,
    setTargetTodoGlobal,
    setIsEditingTodo,
    isEditingTodo,
    viewTodos,
    setViewTodos,
    projects,
    setProjects,
    labels,
    status,
    subtask,
  } = useGlobalContext();

  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleModalContents = (e) => {
    if (
      e.target.id != "todoDone1" &&
      e.target.id != "todoDone2" &&
      e.target.id != "editBtn" &&
      e.target.id != "deleteBtn"
    ) {
      navigate(`/todo/${item.todoId}`);
      //   console.log("modal will be opened", id, e.target.id)
      // const targetTodo = todos.find((item) => item.todoId === id)
      // console.log("targetTodomodal", targetTodo, id)
      // setOpenModal(true)
      // setTargetTodoGlobal(targetTodo);
      // setIsEditingTodo(true)
    }
  };

  const handleEditTodo = (id) => {
    console.log("Edit id", id);
    const targetTodo = todos.find((item) => item.todoId === id);
    console.log("targetTodo", targetTodo, id);
    setOpenModal(!openModal);
    setTargetTodoGlobal(targetTodo); // targetTodo에 저장해야 수정 시 SetTodoForm 불러올 수 있음
    setIsEditingTodo(true);
  };

  const handleDeleteTodo = (id) => {
    console.log("Delete id", id);
    console.log("todos", todos);
    const newArray = todos.filter((item) => item.todoId !== id);
    console.log("new", newArray);

    setTodos(newArray);
  };

  const handleTodoDone = (id) => {
    console.log("tododone", id);

    const arr = todos.map((item) =>
      item.todoId == id ? { ...item, todoDone: !item.todoDone } : item
    );
    setTodos(arr);
  };

  const todoDonePrioritySelector = (priorityId) => {
    if (priorityId == "1") {
      return "todoview_priority1";
    } else if (priorityId == "2") {
      return "todoview_priority2";
    } else if (priorityId == "3") {
      return "todoview_priority3";
    } else if (priorityId == "4") {
      return "todoview_priority4";
    } else if (priorityId == "5") {
      return "todoview_priority5";
    } else if (priorityId == "") {
      return "todoview_priority5";
    }
  };

  // 날짜 갭 계산
  // useEffect(() => {

  //   const oneDay = 24 * 60 * 60* 1000;
  //   const today = new Date();
  //   const anotherDay = new Date("2022-11-10");
  //   console.log("dayday", oneDay, today, anotherDay)

  //   const dayDiff = anotherDay - today;
  //   console.log('daydiff', Math.round(dayDiff/oneDay))
  // },[])

  const dateDifference = (dueDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const anotherDay = new Date(dueDate);
    // console.log("dayday", oneDay, today, anotherDay);

    const dayDiff = Math.round((today - anotherDay) / oneDay);
    // console.log("daydiff", dayDiff);

    if (dayDiff < 0) {
      return (
        <span className={styles.todoViewDDayLabel1}>
          {Math.abs(dayDiff) + " days left"}
        </span>
      );
    } else {
      return (
        <span className={styles.todoViewDDayLabel2}>
          {dayDiff + " days ago"}
        </span>
      );
    }
  };

  const menuClassName = ({ state }) =>
    state === "opening"
      ? styles.menuOpening
      : state === "closing"
      ? styles.menuClosing
      : styles.menu;

  const handleCopyClick = () => {
    const url = `http://localhost:3000/todo/${item.todoId}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        toast.success("Successfully copied!");
      })
      .catch((error) => {
        console.error("URL복사실패", error);
        toast.error("This is an error!");
      });
  };

  return (
    <div
      className={item.todoDone ? styles.todoViewCardDone : styles.todoViewCard}
    >
      <div
        className={styles.todoCardContent}
        onClick={(e) => handleModalContents(e)}
      >
        <div
          className={todoDonePrioritySelector(item.priorityId)}
          onClick={() => handleTodoDone(item.todoId)}
        >
          {item.todoDone ? (
            <MdOutlineCheckCircleOutline id="todoDone1" />
          ) : (
            <MdRadioButtonUnchecked id="todoDone2" />
          )}
        </div>

        <div className={styles.todoCardBody}>
          <div className={styles.todoCardTitle}>{item.todoTitle}</div>

          {/* <div className={styles.todoCardDateview}> 
                  <div className={styles.todoCardDueDate}>
                    <div className={styles.dueDateIcon}>
                      <MdCalendarToday />
                    </div>
                    
                    <div className={styles.dueDateText}>{item.todoDueDate}</div>
                    <div className={styles.todoProjectTitle}>
                    <div className={styles.todoProjectName}>{item.projectTitle}</div>
                    </div>
                  </div>
                  <div className={styles.todoCardDday}>
                    <div className={styles.ddayTrackerText}>
                      {dateDifference(item.todoDueDate)}
                    </div>
                  </div>
                </div> */}
        </div>
      </div>

      <div className={styles.todoItemRightSide}>
        <div className={styles.todoCardDueDate}>
          {item.todoDueDate && (
            <MdCalendarToday className={styles.dueDateIcon} />
          )}
          <div className={styles.dueDateText}>{item.todoDueDate}</div>
        </div>
        <div className={styles.todoProjectTitle}>
          {item.projectId === "" ? null : (
            <div className={styles.todoProjectName}>{item.projectTitle}</div>
          )}
        </div>
        <div className={styles.todoCardDday}>
          <div className={styles.ddayTrackerText}>
            {item.todoDueDate && dateDifference(item.todoDueDate)}
          </div>
        </div>
        {item.statusId && (
          <div className={styles.todoStatus}>{item.statusTitle}</div>
        )}
        {subtask.filter((obj) => obj.subtaskPostId == item.todoId).length >
          0 && (
          <div className={styles.subtaskDisplayNum}>
            {subtask.filter((obj) => obj.subtaskPostId == item.todoId).length}
          </div>
        )}
        {item.label.length > 0 &&
          item.label.map((obj) => (
            <div className={styles.todolabels}>
              <div
                className={styles.circle}
                style={{ backgroundColor: obj.labelColor }}
              ></div>
              <div>{obj.labelName}</div>
            </div>
          ))}

        <div className={styles.todoDelSide}>
          <Menu
            transition
            menuButton={
              <MenuButton className={styles.menuButton}>
                <MdMoreHoriz />
              </MenuButton>
            }
            menuClassName={menuClassName}
          >
            <MenuItem>
              <div
                className={styles.settingDropdownContentItem}
                onClick={() => navigate(`/todo/${item.todoId}`)}
              >
                Edit issue
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className={styles.settingDropdownContentItem}
                onClick={() => handleDeleteTodo(item.todoId)}
              >
                Delete issue
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className={styles.settingDropdownContentItem}
                onClick={handleCopyClick}
              >
                Copy issue link
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default SingleTodoItem;
