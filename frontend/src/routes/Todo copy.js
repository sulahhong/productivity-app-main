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
    openModalProject,
    setOpenModalProject,
    projectIsActive,
    setProjectIsActive,
    projects,
    projectViewtype,
    setProjectviewType,
  } = useGlobalContext();

  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [viewType, setViewType] = useState(0); // priority filter 1~4
  const [sortDone, setSortDone] = useState(false);
  const [sortDueDate, setSortDueDate] = useState(false);
  const [sortCreateDate, setSortCreateDate] = useState(false);
  const [sortPriority, setSortPriority] = useState(false);
  const [sortViewDropdown, setSortViewDropdown] = useState(false);

  // 새로운 솔팅 메뉴를 위한 상태
  const [sortType, setSortType] = useState("");
  const [ascending, setAscending] = useState(true);

  // 새로운 상태를 위한 function
  useEffect(() => {
    if (ascending) {
      if (sortType == "todoPriority") {
        const arr = [...todos]
          .filter((item) => !item.todoDone)
          .sort((a, b) => a.todoPriority - b.todoPriority);
        setViewTodos(arr);
        setViewCategory("ascending");
      } else if (sortType == "todoDone") {
        const arr = [...todos].sort((a, b) => b.todoDone - a.todoDone);
        console.log("handleSortDone", arr);
        setViewTodos(arr);
        setViewCategory("done -> not done");
      } else if (sortType == "todoDueDate") {
        const arr = [...todos]
          .filter((item) => !item.todoDone)
          .sort(
            (a, b) => Date.parse(a.todoDueDate) - Date.parse(b.todoDueDate)
          );
        setViewTodos(arr);
        setViewCategory("duedate ago");
      } else if (sortType == "todoCreateDate") {
        const arr = [...todos]
          .filter((item) => !item.todoDone)
          .sort(
            (a, b) =>
              Date.parse(a.todoCreateDate) - Date.parse(b.todoCreateDate)
          );
        setViewTodos(arr);
        setViewCategory("oldest create");
      }
    } else {
      if (sortType == "todoPriority") {
        const arr = [...todos]
          .filter((item) => !item.todoDone)
          .sort((a, b) => b.todoPriority - a.todoPriority);
        setViewTodos(arr);
        setViewCategory("descending");
      } else if (sortType == "todoDone") {
        const arr = [...todos].sort((a, b) => a.todoDone - b.todoDone);
        setViewTodos(arr);
        setViewCategory("not done -> done");
      } else if (sortType == "todoDueDate") {
        const arr = [...todos]
          .filter((item) => !item.todoDone)
          .sort(
            (a, b) => Date.parse(b.todoDueDate) - Date.parse(a.todoDueDate)
          );
        setViewTodos(arr);
        setViewCategory("duedate later");
      } else if (sortType == "todoCreateDate") {
        const arr = [...todos]
          .filter((item) => !item.todoDone)
          .sort(
            (a, b) =>
              Date.parse(b.todoCreateDate) - Date.parse(a.todoCreateDate)
          );
        setViewTodos(arr);
        setViewCategory("latest create");
      }
    }
  }, [sortType, ascending, todos]);

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
    setViewType(e.target.id);
    const arr = todos.filter((item) => item.todoPriority == e.target.id);
    console.log("PriorityARR", arr);
    setViewTodos(arr);
    setViewCategory("Priority" + e.target.id);
  };

  const handleSortDone = () => {
    setSortDone((prev) => !prev);
  };

  useEffect(() => {
    if (sortDone) {
      console.log("sortsort");
      const arr = [...todos].sort((a, b) => a.todoDone - b.todoDone);
      console.log("handleSortDone", arr);
      setViewTodos(arr);
      setViewCategory("not done -> done");
    } else {
      const arr = [...todos].sort((a, b) => b.todoDone - a.todoDone);
      console.log("handleSortDone", arr);
      setViewTodos(arr);
      setViewCategory("done -> not done");
    }
  }, [sortDone]);

  const handleSortDueDate = () => {
    setSortDueDate((prev) => !prev);
  };

  useEffect(() => {
    if (sortDueDate) {
      const arr = [...todos]
        .filter((item) => !item.todoDone)
        .sort((a, b) => Date.parse(b.todoDueDate) - Date.parse(a.todoDueDate));
      console.log("sortduedate2", arr);
      setViewTodos(arr);
      setViewCategory("duedate left");
    } else {
      const arr = [...todos]
        .filter((item) => !item.todoDone)
        .sort((a, b) => Date.parse(a.todoDueDate) - Date.parse(b.todoDueDate));
      console.log("sortduedate2", arr);
      setViewTodos(arr);
      setViewCategory("duedate ago");
    }
  }, [sortDueDate]);

  const handleSortCreateDate = () => {
    setSortCreateDate((prev) => !prev);
  };

  useEffect(() => {
    if (sortCreateDate) {
      const arr = [...todos]
        .filter((item) => !item.todoDone)
        .sort(
          (a, b) => Date.parse(b.todoCreateDate) - Date.parse(a.todoCreateDate)
        );
      setViewTodos(arr);
      setViewCategory("latest create");
    } else {
      const arr = [...todos]
        .filter((item) => !item.todoDone)
        .sort(
          (a, b) => Date.parse(a.todoCreateDate) - Date.parse(b.todoCreateDate)
        );
      setViewTodos(arr);
      setViewCategory("oldest create");
    }
  }, [sortCreateDate]);

  const handleSortPriority = () => {
    setSortPriority(!sortPriority);
  };

  useEffect(() => {
    if (sortPriority) {
      const arr = [...todos]
        .filter((item) => !item.todoDone)
        .sort((a, b) => b.todoPriority - a.todoPriority);
      setViewTodos(arr);
      setViewCategory("descending");
    } else {
      console.log("ASC");
      const arr = [...todos]
        .filter((item) => !item.todoDone)
        .sort((a, b) => a.todoPriority - b.todoPriority);
      setViewTodos(arr);
      setViewCategory("ascending");
    }
  }, [sortPriority]);

  // const handleAddNewProject = () => {
  //   setOpenModalProject(!openModalProject)
  // }

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

          <div className={styles.sortDropdownContainer}>
            <button
              className={styles.sortDropdownButton}
              onClick={() => setSortViewDropdown(!sortViewDropdown)}
            >
              <MdAdd />
              Add2
            </button>
            {sortViewDropdown && (
              <div
                className={styles.sortDropdownContent}
                // onMouseLeave={() => setSortViewDropdown(!sortViewDropdown)}
              >
                <div className={styles.sortMenuHeader}>Sort</div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoPriority")}
                >
                  Priority
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoDone")}
                >
                  Done
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoDueDate")}
                >
                  Due date
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoCreateDate")}
                >
                  Create date
                </div>

                {ascending ? (
                  <div
                    className={styles.sortMenuItem}
                    onClick={() => setAscending(!ascending)}
                  >
                    Descending
                  </div>
                ) : (
                  <div
                    className={styles.sortMenuItem}
                    onClick={() => setAscending(!ascending)}
                  >
                    Ascending
                  </div>
                )}
              </div>
            )}
          </div>
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
          <button onClick={() => handleSortPriority()}>sort priority</button>
          <button onClick={() => handleSortDone()}>sort Done</button>
          <button onClick={() => handleSortDueDate()}>sort duedate</button>
          <button onClick={() => handleSortCreateDate()}>
            sort Create date
          </button>
        </div>
        <div className={styles.viewTodoNowContainer}>
          <div className={styles.viewTodoNow}>구분 : {viewCategory}</div>
          <div>현재 todo 개수 : {viewTodos.length}</div>
        </div>
        <TodoView />
      </div>
      <div className={styles.todoBodyFooter}>this is the footer </div>
    </div>
  );
}

export default Todo;
