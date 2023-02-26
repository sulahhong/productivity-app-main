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
  MdOutlineInfo,
} from "react-icons/md";
import SingleTodoItem from "./SingleTodoItem";

function TodoView({ groupView, setGroupView }) {
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
      return "todoview_priority1";
    } else if (priority == 2) {
      return "todoview_priority2";
    } else if (priority == 3) {
      return "todoview_priority3";
    } else if (priority == 4) {
      return "todoview_priority4";
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

  // const todoDoneStatus = (todoDone) => {
  //   if (todoDone === true) {
  //     return "todoDoneIsTrue"
  //   }
  // }

  return (
    <div className={styles.todoViewContainer}>
      {viewTodos.length > 0 && groupView ? (
        <div className={styles.todoViewGroupContainer}>
          <div className={styles.todoViewGroupTitle}>P1</div>
          {viewTodos
            .filter((item) => item.todoPriority == "1")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
          <div className={styles.todoViewGroupTitle}>P2</div>
          {viewTodos
            .filter((item) => item.todoPriority == "2")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
          <div className={styles.todoViewGroupTitle}>P3</div>
          {viewTodos
            .filter((item) => item.todoPriority == "3")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
          <div className={styles.todoViewGroupTitle}>P4</div>

          {viewTodos
            .filter((item) => item.todoPriority == "4")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
        </div>
      ) : viewTodos.length > 0 ? (
        viewTodos.map((item) => <SingleTodoItem item={item} />)
      ) : (
        <div className={styles.todoViewEmpty}>
          <div className={styles.todoViewEmptyIcon}>
            <MdOutlineInfo />
          </div>
          <div className={styles.todoViewEmptyText}>
            해당 분류에 등록된 할일이 없습니다 :(
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoView;
