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
          {viewTodos.find((item) => item.priorityId === "1") && (
            <div className={styles.todoViewGroupTitle}>Urgent</div>
          )}

          {viewTodos
            .filter((item) => item.priorityId === "1")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
          {viewTodos.find((item) => item.priorityId === "2") && (
            <div className={styles.todoViewGroupTitle}>High</div>
          )}
          {viewTodos
            .filter((item) => item.priorityId === "2")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
          {viewTodos.find((item) => item.priorityId === "3") && (
            <div className={styles.todoViewGroupTitle}>Medium</div>
          )}
          {viewTodos
            .filter((item) => item.priorityId === "3")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
          {viewTodos.find((item) => item.priorityId === "4") && (
            <div className={styles.todoViewGroupTitle}>Low</div>
          )}

          {viewTodos
            .filter((item) => item.priorityId === "4")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}

             {viewTodos.find((item) => item.priorityId === "5") && (
            <div className={styles.todoViewGroupTitle}>No priority</div>
          )}
          {viewTodos
            .filter((item) => item.priorityId == "5")
            .map((item) => (
              <SingleTodoItem item={item} />
            ))}
        </div>
      ) : viewTodos.filter((item) => item.todoDone === false).length > 0 ? (
        viewTodos
          .filter((item) => item.todoDone === false)
          .map((item) => <SingleTodoItem item={item} />)
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
