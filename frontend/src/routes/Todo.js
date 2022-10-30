import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./Todo.module.css";
import { useGlobalContext } from "../context";
import TodoView from "../components/TodoView";

function Todo() {
  const { todos, setTodos, openModal, setOpenModal,  viewTodos,
    setViewTodos, viewCategory, setViewCategory } = useGlobalContext();
  

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const handleAddNewTodo = () => {
    setOpenModal(!openModal);
  };

  const handleDoneButton = () => {
    const arr =  todos.filter((item) => item.todoDone)
    console.log("arrrr", arr)
    setViewTodos(arr)
    setViewCategory("done")
  }

  const handleNotDoneButton = () => {
    const arr =  todos.filter((item) => !item.todoDone)
    console.log("arrrr", arr)
    setViewTodos(arr)
    setViewCategory("notdone")
  }

  const  handleAllButton = () => {
    setViewTodos(todos)
    setViewCategory("all")
  }




  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoBodyTitle}>
          <button onClick={() => handleAddNewTodo()}>ADD</button>
        </div>
        <div className={styles.todoBodyButton}>
          <button onClick={() => handleAllButton()}>all</button>
          <button onClick={() => handleDoneButton()}>done</button>
          <button onClick={() => handleNotDoneButton()}>not done</button>
        </div>
        <TodoView />
       </div>
        <div className={styles.todoBodyFooter}>3</div>
      </div>
  );
}

export default Todo;
