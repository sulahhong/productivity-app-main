import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  MdAdd,
  MdOutlineCancel,
  MdHome,
  MdCheck,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineNorth,
  MdOutlineSouth,
} from "react-icons/md";
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


  const [sortViewDropdown, setSortViewDropdown] = useState(false);
  const [priorityIsActive, setPriorityIsActive] = useState(false);

  // 새로운 솔팅 메뉴를 위한 상태
  const [sortType, setSortType] = useState("todoPriority");
  const [ascending, setAscending] = useState(true);
  const [filterType, setFilterType] = useState("filterAll");

  const [groupView, setGroupView] = useState(false);

  useEffect(() => {
    let arr = [...todos];
    if(groupView) {
      let arr2 = arr.sort((a, b) => a.todoPriority - b.todoPriority);
        setViewTodos(arr2);
    } else {
      setViewTodos(arr);
    }
  }, [groupView])

  // 새로운 상태를 위한 function
  useEffect(() => {
    let arr = [...todos];
    if (filterType == "filterAll") {
      sortAction(arr);
    } else if (filterType == "filterDone") {
      let arrFilter = arr.filter((item) => item.todoDone);
      sortAction(arrFilter);
    } else if (filterType == "filterNotDone") {
      let arrFilter = arr.filter((item) => !item.todoDone);
      sortAction(arrFilter);
    } else if (filterType == "filterP1") {
      let arrFilter = arr.filter((item) => item.todoPriority == "1");
      sortAction(arrFilter);
    } else if (filterType == "filterP2") {
      let arrFilter = arr.filter((item) => item.todoPriority == "2");
      sortAction(arrFilter);
    } else if (filterType == "filterP3") {
      let arrFilter = arr.filter((item) => item.todoPriority == "3");
      sortAction(arrFilter);
    } else if (filterType == "filterP4") {
      let arrFilter = arr.filter((item) => item.todoPriority == "4");
      sortAction(arrFilter);
    }
  }, [sortType, ascending, todos, filterType]);

  const sortAction = (arr) => {
    console.log("SUPER", arr);
    if (ascending) {
      if (sortType == "todoPriority") {
        let arr2 = arr.sort((a, b) => a.todoPriority - b.todoPriority);
        setViewTodos(arr2);
      } else if (sortType == "todoDone") {
        let arr2 = arr.sort((a, b) => b.todoDone - a.todoDone);
        setViewTodos(arr2);
      } else if (sortType == "todoDueDate") {
        let arr2 = arr.sort(
          (a, b) => Date.parse(a.todoDueDate) - Date.parse(b.todoDueDate)
        );
        setViewTodos(arr2);
      } else if (sortType == "todoCreateDate") {
        let arr2 = arr.sort(
          (a, b) => Date.parse(a.todoCreateDate) - Date.parse(b.todoCreateDate)
        );
        setViewTodos(arr2);
      }
    } else {
      if (sortType == "todoPriority") {
        let arr2 = arr.sort((a, b) => b.todoPriority - a.todoPriority);
        setViewTodos(arr2);
      } else if (sortType == "todoDone") {
        let arr2 = arr.sort((a, b) => a.todoDone - b.todoDone);
        setViewTodos(arr2);
      } else if (sortType == "todoDueDate") {
        let arr2 = arr.sort(
          (a, b) => Date.parse(b.todoDueDate) - Date.parse(a.todoDueDate)
        );
        setViewTodos(arr2);
      } else if (sortType == "todoCreateDate") {
        let arr2 = arr.sort(
          (a, b) => Date.parse(b.todoCreateDate) - Date.parse(a.todoCreateDate)
        );
        setViewTodos(arr2);
      }
    }
  };

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
          <button
            className={styles.todoAddButton}
            onClick={() => handleAddNewTodo()}
          >
            <MdAdd className={styles.todoAddIcon} />
            Add
          </button>
          <div>
            <button onClick={() => setGroupView(!groupView)}>Group button</button>
          </div>
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
                <div className={styles.sortMenuHeader}>Filter</div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setFilterType("filterAll")}
                >
                  All {filterType == "filterAll" && <MdCheck />}
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setFilterType("filterDone")}
                >
                  Done {filterType == "filterDone" && <MdCheck />}
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setFilterType("filterNotDone")}
                >
                  Not Done {filterType == "filterNotDone" && <MdCheck />}
                </div>
                <div
                  className={styles.sortMenuItem1}
                  onClick={() => setPriorityIsActive(!priorityIsActive)}
                >
                  <div className={styles.sortMenuItem1}>Priority </div>
                  {priorityIsActive ? (
                    <div className={styles.sortMenuIcon}>
                      <MdKeyboardArrowDown />
                    </div>
                  ) : (
                    <div className={styles.sortMenuIcon}>
                      <MdKeyboardArrowRight />
                    </div>
                  )}
                </div>
                {priorityIsActive && (
                  <div>
                    <div
                      className={styles.sortMenuPItem}
                      onClick={() => setFilterType("filterP1")}
                    >
                      Priority1 {filterType == "filterP1" && <MdCheck />}
                    </div>
                    <div
                      className={styles.sortMenuPItem}
                      onClick={() => setFilterType("filterP2")}
                    >
                      Priority2 {filterType == "filterP2" && <MdCheck />}
                    </div>
                    <div
                      className={styles.sortMenuPItem}
                      onClick={() => setFilterType("filterP3")}
                    >
                      Priority3 {filterType == "filterP3" && <MdCheck />}
                    </div>
                    <div
                      className={styles.sortMenuPItem}
                      onClick={() => setFilterType("filterP4")}
                    >
                      Priority4 {filterType == "filterP4" && <MdCheck />}
                    </div>
                  </div>
                )}

                <div className={styles.sortMenuHeader}>Sort</div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoPriority")}
                >
                  Priority {sortType == "todoPriority" && <MdCheck />}
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoDone")}
                >
                  Done {sortType == "todoDone" && <MdCheck />}
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoDueDate")}
                >
                  Due date {sortType == "todoDueDate" && <MdCheck />}
                </div>
                <div
                  className={styles.sortMenuItem}
                  onClick={() => setSortType("todoCreateDate")}
                >
                  Create date {sortType == "todoCreateDate" && <MdCheck />}
                </div>

                {ascending ? (
                  <div
                    className={styles.sortMenuItem}
                    onClick={() => setAscending(!ascending)}
                  >
                    Descending <MdOutlineNorth />
                  </div>
                ) : (
                  <div
                    className={styles.sortMenuItem}
                    onClick={() => setAscending(!ascending)}
                  >
                    Ascending <MdOutlineSouth />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.viewTodoNowContainer}>
          <div className={styles.viewTodoNow}>구분 : {viewCategory}</div>
          <div>현재 todo 개수 : {viewTodos.length}</div>
        </div>
        <TodoView 
        groupView={groupView} setGroupView={setGroupView}/>
      </div>
      <div className={styles.todoBodyFooter}>this is the footer </div>
    </div>
  );
}

export default Todo;
