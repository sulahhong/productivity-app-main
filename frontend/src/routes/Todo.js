import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./Todo.module.css";
import { useGlobalContext } from "../context";
import TodoView from "../components/TodoView";

function Todo() {
  const { todos, setTodos, openModal, setOpenModal } = useGlobalContext();
  

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const handleAddNewTodo = () => {
    setOpenModal(!openModal);
  };


  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoBodyTitle}>
          <button onClick={() => handleAddNewTodo()}>ADD</button>
        </div>
        <TodoView />
       </div>
        <div className={styles.todoBodyFooter}>3</div>
      </div>
  );
}

export default Todo;
