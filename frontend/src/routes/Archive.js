import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from '../context';
import styles from "./Todo.module.css";
import SingleTodoItem from '../components/SingleTodoItem';

function Archive() {

const {todos, setTodos,} = useGlobalContext();

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoViewContainer}>
            {todos.filter(item => item.todoDone === true)
            .map((item) => <SingleTodoItem item={item} /> )}
        </div>
     </div>
    </div>
  )
}

export default Archive;