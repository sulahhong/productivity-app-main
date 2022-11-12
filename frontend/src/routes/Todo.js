import React, { useEffect, useReducer, useRef, useState } from "react";
import { MdAdd, MdOutlineCancel, MdHome, MdCheck } from "react-icons/md";
import styles from "./Todo.module.css";
import { useGlobalContext } from "../context";
import TodoView from "../components/TodoView";

function Todo() {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    viewTodos,
    setViewTodos,
    viewCategory,
    setViewCategory,
  } = useGlobalContext();

  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [viewType, setViewType] = useState(0);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const handleAddNewTodo = () => {
    setOpenModal(!openModal);
  };

  const handleDoneButton = () => {
    const arr = todos.filter((item) => item.todoDone);
    console.log("arrrr", arr);
    setViewTodos(arr);
    setViewCategory("done");
  };

  const handleNotDoneButton = () => {
    const arr = todos.filter((item) => !item.todoDone);
    console.log("arrrr", arr);
    setViewTodos(arr);
    setViewCategory("notdone");
  };

  const handleAllButton = () => {
    setViewTodos(todos);
    setViewCategory("all");
  };

  const handlePriorityButton = (e) => {
    console.log("hihi", e.target.id);
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoBodyTitle}>
          <button
            className={styles.todoAddButton}
            onClick={() => handleAddNewTodo()}
          >
            <MdAdd className={styles.todoAddIcon} />
            Add
          </button>
        </div>
        <div className={styles.todoBodyButton}>
          <button onClick={() => handleAllButton()}>all</button>
          <button onClick={() => handleDoneButton()}>done</button>
          <button onClick={() => handleNotDoneButton()}>not done</button>
          <div className={styles.sortPriorityContainer}>
            <button
              className={styles.sortPriorityButton}
              onClick={() => setPriorityDropdown(!priorityDropdown)}
            >
              우선순위
            </button>
            {priorityDropdown && (
              <div
                className={styles.priorityDropdown}
                onClick={(e) => handlePriorityButton(e)}
                onMouseLeave={() => setPriorityDropdown(!priorityDropdown)}
              >
                <li id="1">P1 {viewType == 1 && <MdCheck />}</li>
                <li id="2">P2 {viewType == 2 && <MdCheck />}</li>
                <li id="3">P3 {viewType == 3 && <MdCheck />}</li>
                <li id="4">P4 {viewType == 4 && <MdCheck />}</li>
              </div>
            )}
          </div>
        </div>
        <TodoView />
      </div>
      <div className={styles.todoBodyFooter}>this is the footer </div>
    </div>
  );
}

export default Todo;
