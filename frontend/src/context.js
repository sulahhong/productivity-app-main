import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let storage = localStorage.getItem("todoList");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const getLocalStorageProject = () => {
  let storage = localStorage.getItem("project");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [todos, setTodos] = useState(getLocalStorage());
  const [targetTodoGlobal, setTargetTodoGlobal] = useState({});
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalProject, setOpenModalProject] = useState(false);
  const [viewTodos, setViewTodos] = useState(todos);
  const [viewCategory, setViewCategory] = useState("all");
  const [navbarSideIsOpen, setNavbarSideIsOpen] = useState(false);
  const [projects, setProjects] = useState(getLocalStorageProject());
  const [targetProjectGlobal, setTargetProjectGlobal] = useState({});
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectIsActive, setProjectIsActive] = useState(false);
  const [projectViewtype, setProjectviewType] = useState("");

  useEffect(() => {
    console.log("todostodos", todos)
    console.log("projectsprojects", projects)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    window.localStorage.setItem("project", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (viewCategory == "done") {
      const arr = todos.filter((item) => item.todoDone);
      console.log("arrrr", arr);
      setViewTodos(arr);
    } else if (viewCategory == "notdone") {
      const arr = todos.filter((item) => !item.todoDone);
      console.log("arrrr", arr);
      setViewTodos(arr);
    } else if (viewCategory == "all") {
      setViewTodos(todos);
    }
  }, [todos]);

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        openModal,
        setOpenModal,
        targetTodoGlobal,
        setTargetTodoGlobal,
        isEditingTodo,
        setIsEditingTodo,
        viewTodos,
        setViewTodos,
        viewCategory,
        setViewCategory,
        navbarSideIsOpen,
        setNavbarSideIsOpen,
        openModalProject,
        setOpenModalProject,
        projects,
        setProjects,
        targetProjectGlobal,
        setTargetProjectGlobal,
        isEditingProject,
        setIsEditingProject,
        projectIsActive, 
        setProjectIsActive,
        projectViewtype, 
        setProjectviewType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
