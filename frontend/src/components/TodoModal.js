import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./TodoModal.module.css";

function TodoModal() {
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
  const [todoForm, setTodoForm] = useState({
    todoId: "",
    todoTitle: "",
    todoDescription: "",
    todoDone: false,
    todoPriority: "1",
    todoCreateDate: "",
    todoDueDate: "",
  });
  const {
    todoId,
    todoTitle,
    todoDescription,
    todoDone,
    todoPriority,
    todoCreateDate,
    todoDueDate,
  } = todoForm;

  useEffect(() => {
    if (isEditingTodo) {
      setTodoForm(targetTodoGlobal);
    }
    console.log("jenggo", isEditingTodo);
  }, []);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const handleAddNewTodo = () => {
    setOpenModal(!openModal);
  };

  const handleTodoChange = (e) => {
    // console.log("name", e.target.name);

    // console.log("value", e.target.value);
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateTodo = () => {
    const todoCreateDate = new Date().toISOString().slice(0,10);
    console.log(todoCreateDate);
    const todoId = uuidv4();
    console.log(todoId);
    console.log("todoform", todoForm);
    setTodoForm((prevState) => ({
      ...prevState,
      todoCreateDate,
      todoId,
    }));
    // setOpenModal(false)
  };

  const handleEditTodoModal = () => {
    const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    console.log("index", todoEditIndex);

    const testArray = [...todos];
    console.log("test", testArray);
    testArray.splice(todoEditIndex, 1, {
      todoId: todoId,
      todoTitle: todoTitle,
      todoDescription: todoDescription,
      todoDone: todoDone,
      todoPriority: todoPriority,
      todoCreateDate: todoCreateDate,
      todoDueDate: todoDueDate,
    });
    console.log("test2", testArray);

    // const nonEditArray= todos.filter((item)=>item.todoId!=todoId)

    // console.log("hhh", nonEditArray)
    // nonEditArray.push({ "todoId":todoId,
    //   "todoTitle":todoTitle,
    //   "todoDescription":todoDescription,
    //   "todoDone": todoDone,
    //   "todoPriority": todoPriority,
    //   "todoCreateDate": todoCreateDate,
    //   "todoDueDate": todoDueDate})

    //   console.log("hhhV22222", nonEditArray)

    setTodos(testArray);
    setOpenModal(false);
    // setTodoForm({
    //   todoId: "",
    //   todoTitle: "",
    //   todoDescription: "",
    //   todoDone: false,
    //   todoPriority: "1",
    //   todoCreateDate: "",
    //   todoDueDate: "",
    // })
    setTargetTodoGlobal({});
    setIsEditingTodo(false);
  };

  //   const handleEditTodoModal = () => {
  //     const nonEditArray= todos.filter((item)=>item.todoId!=todoId)

  //     console.log("hhh", nonEditArray)
  //     nonEditArray.push({ "todoId":todoId,
  //       "todoTitle":todoTitle,
  //       "todoDescription":todoDescription,
  //       "todoDone": todoDone,
  //       "todoPriority": todoPriority,
  //       "todoCreateDate": todoCreateDate,
  //       "todoDueDate": todoDueDate})

  //       console.log("hhhV22222", nonEditArray)

  //       setTodos(nonEditArray)
  //       setOpenModal(false)
  //       // setTodoForm({
  //       //   todoId: "",
  //       //   todoTitle: "",
  //       //   todoDescription: "",
  //       //   todoDone: false,
  //       //   todoPriority: "1",
  //       //   todoCreateDate: "",
  //       //   todoDueDate: "",
  //       // })
  // setTargetTodoGlobal({})
  // setIsEditingTodo(false)
  //   }

  const createNewTodo = () => {
    console.log("gg", todoForm);

    setTodos([todoForm, ...todos]);
    setOpenModal(false);
  };

  useEffect(() => {
    if (!isEditingTodo) {
      if (todoCreateDate && todoId) {
        console.log("xxx", todoForm);
        createNewTodo();
      }
      console.log("i run");
    }
  }, [todoCreateDate, todoId]);

  const closeModal = () => {
    setOpenModal(false);
    setTargetTodoGlobal({});
    setIsEditingTodo(false);
  };

  return (
    <div className={styles.todoModalOverlay}>
      <div className={styles.todoModalContainer}>
        <div className={styles.todoModalHeader}>
          <div className={styles.todoModalHeaderTitle}>New Task</div>
          <button className={styles.todoModalCloseButton} onClick={closeModal}>
            X
          </button>
        </div>
        <div className={styles.todoModalBody}>
          <div className={styles.todoModalInput}>
            <input
              className={styles.todoModalInputTitle}
              name="todoTitle"
              placeholder="title"
              value={todoTitle}
              onChange={handleTodoChange}
            />
            <input
              className={styles.todoModalInputDescription}
              placeholder="Description"
              name="todoDescription"
              value={todoDescription}
              onChange={handleTodoChange}
            />
          </div>
          <div className={styles.todoModalSettings}>
            <div className={styles.todoModalSetting}>
              <div className={styles.todoModalSettingIcon}></div>
              <div className={styles.todoModalSettingText}>Priority</div>
              <select
                className={styles.todoModalSettingOption}
                name="todoPriority"
                value={todoPriority}
                onChange={handleTodoChange}
              >
                <option value="1">priority 1</option>
                <option value="2">priority 2</option>
                <option value="3">priority 3</option>
                <option value="4">priority 4</option>
              </select>
            </div>
          </div>
          <div className={styles.todoModalSetting}>
            <div className={styles.todoModalDueDate}>
              <div className={styles.todoModalDueDateTitle}>Duedate</div>
              <input
                type="date"
                value={todoDueDate}
                name="todoDueDate"
                onChange={handleTodoChange}
              />
            </div>
          </div>
          <div className={styles.todoModalAddTodocontainer}>
            {isEditingTodo ? (
              <button
                className={styles.todoModalAddTodo}
                onClick={() => handleEditTodoModal()}
              >
                Edit
              </button>
            ) : (
              <button
                className={styles.todoModalAddTodo}
                onClick={() => handleCreateTodo()}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
