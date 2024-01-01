import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  MdCheck,
} from "react-icons/md";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./NewTodoModal.module.css";
// import Comments from "./Dropdown/Comments";
import { MdKeyboardArrowDown, MdAdd } from "react-icons/md";
// import priorityDropdown from "./Dropdown/PriorityDropdown";
// import DuedateDropdown from "./DuedateDropdown";
// import ProjectDropdown from "./ProjectDropdown";
// import LabelDropdown from "./LabelDropdown";
// import StatusDropdown from "./StatusDropdown";
import toast, { Toaster } from "react-hot-toast";
import StatusDropdown from "../components/StatusDropdown";
import StatusDropdown2 from "./Dropdown/StatusDropdown";
import PriorityDropdown from "./Dropdown/PriorityDropdown";
import DuedateDropdown from "./Dropdown/DuedateDropdown";
import LabelDropdown from "./Dropdown/LabelDropdown";
import AssigneeDropdown from "./Dropdown/AssigneeDropdown";

function NewTodoModal() {
  const {
    openTodoModal,
    setOpenTodoModal,
    status: statusOpt,
    priority: priorityOpt,
    createTodo,
    getTodos,
    labels,
  } = useGlobalContext();

  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
    priority: priorityOpt[0],
    status: statusOpt[0],
    dueDate: "",
    parent: null,
    label: [],
    assignee: [],
  });

  const { title, description, priority, status, dueDate, label } = todoForm;

  const path = window.location.pathname;
  const pathSegments = path.split("/");

  const slug = pathSegments[1];
  const projectId = pathSegments[3];

  const handleCreateTodo = async () => {
    const success = await createTodo(todoForm, slug, projectId);

    if (success) {
      await setOpenTodoModal(false);
      await getTodos(slug, projectId);
    }
  };

  const handleTodoChange = (e) => {
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.todoModalOverlay}>
      <div className={styles.todoModalContainer}>
        <div className={styles.todoModalHeader}>
          <div className={styles.todoModalHeaderTitle}>New Task</div>
          <button
            className={styles.todoModalCloseButton}
            onClick={() => setOpenTodoModal(false)}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className={styles.optionContainer}>
          <StatusDropdown2 todoForm={todoForm} setTodoForm={setTodoForm} />
          <PriorityDropdown todoForm={todoForm} setTodoForm={setTodoForm} />
          <DuedateDropdown todoForm={todoForm} setTodoForm={setTodoForm} />
          <LabelDropdown todoForm={todoForm} setTodoForm={setTodoForm} />
          <AssigneeDropdown todoForm={todoForm} setTodoForm={setTodoForm} />
        </div>

        <div className={styles.todoModalBody}>
          <div className={styles.todoModalInput}>
            <input
              className={styles.todoModalInputTitle}
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleTodoChange}
            />
            <div className={styles.todoDesWrap}>
              <textarea
                className={styles.todoModalInputDescription}
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleTodoChange}
              />
            </div>
          </div>
          <div className={styles.todoModalAddTodocontainer}>
            <button
              className={styles.todoModalAddTodo}
              onClick={() => handleCreateTodo()}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTodoModal;
