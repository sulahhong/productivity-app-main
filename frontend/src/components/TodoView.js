import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./TodoView.module.css";
import { useGlobalContext } from "../context";
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdCalendarToday,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineToday,
} from "react-icons/md";

function TodoView() {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    targetTodoGlobal,
    setTargetTodoGlobal,
    setIsEditingTodo,
    isEditingTodo,
  } = useGlobalContext();

  const handleEditTodo = (id) => {
    console.log("Edit id", id);
    const targetTodo = todos.find((item) => item.todoId === id);
    console.log("targetTodo", targetTodo, id);
    setOpenModal(!openModal);
    setTargetTodoGlobal(targetTodo);
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

  const todoDonePrioritySelector = (priority) => {
    if (priority == 1) {
      return "todoview_priority1"
    } else if (priority == 2) {
      return "todoview_priority2"
    } else if (priority == 3) {
      return "todoview_priority3"
    } else if (priority == 4) {
      return "todoview_priority4"
    } 
  };



  // const todoDoneStatus = (todoDone) => {
  //   if (todoDone === true) {
  //     return "todoDoneIsTrue"
  //   } 
  // }



  return (
    <div className={styles.todoViewContainer}>
      {todos.map((item) => (
        // <div className={todoDoneStatus(item.tododone)}>
        <div className={styles.todoViewCard}>
          <div className={styles.todoCardContent}>
            <div
              className={todoDonePrioritySelector(item.todoPriority)}
              onClick={() => handleTodoDone(item.todoId)}
            >
              {item.todoDone ? (
                <MdOutlineCheckCircleOutline />
              ) : (
                <MdRadioButtonUnchecked />
              )}
            </div>
            <div className={styles.todoCardBody}>
              <div className={styles.todoCardTitle}>{item.todoTitle}</div>
              <div className={styles.todoCardDescription}>
                {item.todoDescription}
              </div>
              <div className={styles.todoCardPriority}>{item.todoPriority}</div>
              <div className={styles.todoCardDueDate}>
                <div className={styles.dueDateIcon}>
                  <MdCalendarToday />
                </div>
                <div className={styles.dueDateText}>{item.todoDueDate}</div>
              </div>
              <div className={styles.dDayTrackerIcon}><MdOutlineToday /></div>
              <div className={styles.dDayTrackerText}>{}</div>
            </div>
          </div>
          <div className={styles.todoCardButtons}>
            <div
              className={styles.todoCardEditButton}
              onClick={() => handleEditTodo(item.todoId)}
            >
              <MdOutlineEdit />
            </div>
            <div
              className={styles.todoCardDeleteButton}
              onClick={() => handleDeleteTodo(item.todoId)}
            >
              <MdOutlineDelete />
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
}

export default TodoView;
