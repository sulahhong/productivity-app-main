import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

const getLocalStorageSubtask = () => {
  let storage = localStorage.getItem("subtask");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const getLocalStorageLabels = () => {
  let storage = localStorage.getItem("labels");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const getLocalStorageUser = () => {
  let storage = localStorage.getItem("user");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return {};
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
  const [priority, setPriority] = useState([
    { priorityId: "1", priorityTitle: "Urgent" },
    { priorityId: "2", priorityTitle: "High" },
    { priorityId: "3", priorityTitle: "Medium" },
    { priorityId: "4", priorityTitle: "Low" },
    { priorityId: "5", priorityTitle: "No priority" },
  ]);

  const [status, setStatus] = useState([
    { statusId: "1", statusTitle: "Backlog" },
    { statusId: "2", statusTitle: "Todo" },
    { statusId: "3", statusTitle: "In Progress" },
    { statusId: "4", statusTitle: "Done" },
    { statusId: "5", statusTitle: "Cancelled" },
  ]);

  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [dueDateDropdown, setDueDateDropdown] = useState(false);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);

  const [comments, setComments] = useState(getLocalStorageComments());
  const [targetCommentGlobal, setTaegetCommentGlobal] = useState({});
  // const [isEditingComment, setIsEditingComment] = useState(false);

  const [reply, setReply] = useState(getLocalStorageReply());
  const [subtask, setSubtask] = useState(getLocalStorageSubtask());
  // const [onSubtask, setOnSubtask] = useState(false);

  //SideOptionModal 상태
  const [openSideModal, setOpenSideModal] = useState(false);

  //Create Workspace Modal
  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false)

  //Workspace state
  const [workspace, setWorkspace] = useState([])
  const [currentWorkspace, setCurrentWorkspace] = useState()

  //Project state
  const [project, setProject] = useState([])

  // Todo State
  const [todo, setTodo] = useState([])

  //labelList
  const [labels, setLabels] = useState(getLocalStorageLabels());

  // const [user, setUser] = useState({
  //   userId: "8888",
  //   userName: "SA",
  //   userEmail: "sulah@gmail.com",
  // });

  //test
  const [user, setUser] = useState(getLocalStorageUser());
  const [todo2, setTodo2] = useState([]);

  //API URL
  const BASE_URL = "http://localhost:5000/api/";
  const configToken = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const navigate = useNavigate();

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
    window.localStorage.setItem("subtask", JSON.stringify(subtask));
  }, [subtask]);

  useEffect(() => {
    window.localStorage.setItem("labels", JSON.stringify(labels));
  }, [labels]);

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

  //   const checkFunc=()=>{
  //     console.log("NNNN")
  //     setOnSubtask(false)
  // }

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

  // useEffect(()=>{
  //   getTodos()
  // }, [])

  // -------------------API service--------------------//
  //Login user

  const loginUser = async (loginForm) => {
    console.log("START LOGIN...");
    try {
      const response = await axios.post(BASE_URL + "users/login", loginForm);
      console.log("LOGIN RES: ", response);
      
  
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success('Successfully created!');
        navigate('/myworkspace')
      } 
    } catch (error) {
      console.log("errpr", error)
       toast.error(error.response.data.message);
    }
   
  };

  // Get joined workspace
  const getJoinedWorkspace = async () => {
    try {
      const response = await axios.get(BASE_URL + "workspace/joined", configToken);
      console.log("GET JOINED WSPACE: ", response);
      
  
      if (response.data) {
        setWorkspace(response.data.data)
      } 
    } catch (error) {
      console.log("error", error)
       toast.error(error.response.data.message);
    }
   
  };

  //Create Workspace
  const createWorkspace = async (workspaceForm) => {
    try {
      const response = await axios.post(BASE_URL + "workspace", workspaceForm, configToken);
      console.log("CREATE NEW WSPACE: ", response);
      
  
      if (response.data) {
        toast.success('Successfully created!');
        return true
      } 
    } catch (error) {
      console.log("error", error)
       toast.error(error.response.data.message);
    }
   
  };

  // GET project by Wspace
  const getProjectByWspace = async (slug) => {
    try {
      const response = await axios.get(BASE_URL + `workspace/${slug}/project`, configToken);
      console.log("GET PROJECT: ", response);
      
  
      if (response.data) {
        setProject(response.data.data)
      } 
    } catch (error) {
      console.log("error", error)
       toast.error(error.response.data.message);
    }
   
  };
  
  // CREATE Projects
  const createProject = async (projectForm, slug) => {
    console.log("SLUG :", slug)
    try {
      const response = await axios.post(BASE_URL + `workspace/${slug}/project`, projectForm, configToken);
      console.log("CREATE NEW PROJ: ", response);
      
  
      if (response.data) {
        toast.success('Successfully created!');
        return true
      } 
    } catch (error) {
      console.log("error", error)
       toast.error(error.response.data.message);
    }
   
  };



  //Register User
  const registerUser = async (registerForm) => {
    const response = await axios.post(BASE_URL + "users", registerForm);
    console.log("REGISTER RES: ", response);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  };

  //Create todo

  const createTodo = async (todoForm) => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${user2.token}`,
    //   },
    // };

    // const response = await axios.post(BASE_URL + "todos", todoForm, config);
    // console.log("CREATE TODO RES: ", response);
  };

  //Get todos

  const getTodos = async (slug, projectId) => {
    try {
      const response = await axios.get(BASE_URL + `workspace/${slug}/project/${projectId}/todo`, configToken);
      console.log("GET Todos: ", response);
      
  
      if (response.data) {
        setTodo(response.data)
      } 
    } catch (error) {
      console.log("error", error)
       toast.error(error.response.data.message);
    }
   
  };

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
        subtask,
        setSubtask,
        priority,
        setPriority,
        priorityDropdown,
        setPriorityDropdown,
        dueDateDropdown,
        setDueDateDropdown,
        projectDropdown,
        setProjectDropdown,
        openSideModal,
        setOpenSideModal,
        labels,
        setLabels,
        status,
        setStatus,
        statusDropdown,
        setStatusDropdown,
        loginUser,
        createTodo,
        getTodos,
        registerUser,
        openWorkspaceModal,
        setOpenWorkspaceModal,
        getJoinedWorkspace,
        workspace,
        createWorkspace, 
        getProjectByWspace, 
        project,
        openProjectModal, setOpenProjectModal, 
        createProject, 
        currentWorkspace, setCurrentWorkspace, 
        todo, setTodo
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
