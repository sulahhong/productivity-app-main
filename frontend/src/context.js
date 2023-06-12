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
    return [
      { projectId: "", projectTitle: "No Project", projectDescription: "" },
    ];
  }
};

const getLocalStorageComments = () => {
  let storage = localStorage.getItem("comments");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const getLocalStorageReply = () => {
  let storage = localStorage.getItem("reply");
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
  const [filterType, setFilterType] = useState("filterAll");

  const [comments, setComments] = useState(getLocalStorageComments());
  const [targetCommentGlobal, setTaegetCommentGlobal] = useState({});
  const [isEditingComment, setIsEditingComment] = useState(false);

  const [reply, setReply] = useState(getLocalStorageReply());

  const [user, setUser] = useState({
    userId: "8888",
    userName: "SA",
    userEmail: "sulah@gmail.com",
  });

  useEffect(() => {
    console.log("todostodos", todos);
    console.log("projectsprojects", projects);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    window.localStorage.setItem("project", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    window.localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    window.localStorage.setItem("reply", JSON.stringify(reply));
  }, [reply]);

  useEffect(() => {
    // let arr = [...todos];
    if (filterType == "filterAll") {
      setViewTodos(todos);
    } else if (filterType == "filterDone") {
      let arr = todos.filter((item) => item.todoDone);
      setViewTodos(arr);
    } else if (filterType == "filterNotDone") {
      let arr = todos.filter((item) => !item.todoDone);
      setViewTodos(arr);
    } else if (filterType == "filterP1") {
      let arr = todos.filter((item) => item.todoPriority == "1");
      setViewTodos(arr);
    } else if (filterType == "filterP2") {
      let arr = todos.filter((item) => item.todoPriority == "2");
      setViewTodos(arr);
    } else if (filterType == "filterP3") {
      let arr = todos.filter((item) => item.todoPriority == "3");
      setViewTodos(arr);
    } else if (filterType == "filterP4") {
      let arr = todos.filter((item) => item.todoPriority == "4");
      setViewTodos(arr);
    }
  }, [todos]);

  // useEffect(() => {
  //   if (viewCategory == "done") {
  //     const arr = todos.filter((item) => item.todoDone);
  //     console.log("arrrr", arr);
  //     setViewTodos(arr);
  //   } else if (viewCategory == "notdone") {
  //     const arr = todos.filter((item) => !item.todoDone);
  //     console.log("arrrr", arr);
  //     setViewTodos(arr);
  //   } else if (viewCategory == "all") {
  //     setViewTodos(todos);
  //   }
  // }, [todos]);

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
        filterType,
        setFilterType,
        comments,
        setComments,
        reply,
        setReply,
        user,
        setUser,
        targetCommentGlobal,
        setTaegetCommentGlobal,
        isEditingComment,
        setIsEditingComment,
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
