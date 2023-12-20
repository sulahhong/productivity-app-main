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
    { sid: "0", title: "No priority" },
    { sid: "1", title: "Urgent" },
    { sid: "2", title: "High" },
    { sid: "3", title: "Medium" },
    { sid: "4", title: "Low" },
  ]);

  // const [priority, setPriority] = useState([
  //   { priorityId: "1", priorityTitle: "Urgent" },
  //   { priorityId: "2", priorityTitle: "High" },
  //   { priorityId: "3", priorityTitle: "Medium" },
  //   { priorityId: "4", priorityTitle: "Low" },
  //   { priorityId: "5", priorityTitle: "No priority" },
  // ]);

  const [status, setStatus] = useState([
    { sid: "0", title: "No Status" },
    { sid: "1", title: "Backlog" },
    { sid: "2", title: "Todo" },
    { sid: "3", title: "In Progress" },
    { sid: "4", title: "Done" },
    { sid: "5", title: "Cancelled" },
  ]);

  // const [status, setStatus] = useState([
  //   { statusId: "1", statusTitle: "Backlog" },
  //   { statusId: "2", statusTitle: "Todo" },
  //   { statusId: "3", statusTitle: "In Progress" },
  //   { statusId: "4", statusTitle: "Done" },
  //   { statusId: "5", statusTitle: "Cancelled" },
  // ]);

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
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openLabelModal, setOpenLabelModal] = useState(false);

  //Workspace state
  const [workspace, setWorkspace] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState();

  //Project state
  const [project, setProject] = useState([]);

  // Todo State
  const [todo, setTodo] = useState([]);

  //labelList
  // const [labels, setLabels] = useState([]);

  const [labels, setLabels] = useState([]);

  // const [user, setUser] = useState({
  //   userId: "8888",
  //   userName: "SA",
  //   userEmail: "sulah@gmail.com",
  // });

  //test
  const [user, setUser] = useState(getLocalStorageUser());
  const [todo2, setTodo2] = useState([]);

  //API URL
  // const BASE_URL = "http://localhost:5000/api/";
  const BASE_URL =
    process.env.REACT_APP_ENV === "production"
      ? "http://128.199.74.175/api/"
      : "http://localhost:5000/api/";

  console.log("process.env.REACT_APP_ENV", process.env.REACT_APP_ENV);

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
    console.log("WS ", openWorkspaceModal);
  }, [openWorkspaceModal]);

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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Successfully login!");
        navigate("/myworkspace");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //Register User
  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(
        BASE_URL + "users/register",
        registerForm
      );
      console.log("REGISTER RES: ", response);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Successfully created!");
        navigate("/myworkspace");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //Logout User
  const logoutUser = async () => {
    //토큰 삭제 + 리다이렉트
    localStorage.removeItem("user");
    setUser({});
    toast.success("Successfully logout!");
    navigate("/login");
  };

  //User Avatar
  const uploadUserAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(BASE_URL + "users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 필수: 파일을 업로드할 때는 Content-Type을 지정해야함
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Image uploaded successfully:", response.data);
      if (response.data) {
        return true;
      }
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  };

  //Get Me
  const getMe = async () => {
    try {
      const response = await axios.get(BASE_URL + "users/me", configToken);
      console.log("GET User: ", response);

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Update User (profile setting)
  const updateUser = async (profileForm) => {
    try {
      const response = await axios.post(
        BASE_URL + "users/update",
        profileForm,
        configToken
      );
      console.log("UPDATE User: ", response);

      if (response.data) {
        return true;
      }
    } catch (error) {
      return false;
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get Members
  const getMembers = async (slug, projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/members`,
        configToken
      );
      console.log("GET Members: ", response);

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  // Get joined workspace
  const getJoinedWorkspace = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "workspace/joined",
        configToken
      );
      console.log("GET JOINED WSPACE: ", response);

      if (response.data) {
        setWorkspace(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        navigate(`/login`);
      }
    }
  };

  //Create Workspace
  const createWorkspace = async (workspaceForm) => {
    try {
      const response = await axios.post(
        BASE_URL + "workspace",
        workspaceForm,
        configToken
      );
      console.log("CREATE NEW WSPACE: ", response);

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  // GET project by Wspace
  const getProjectByWspace = async (slug) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project`,
        configToken
      );
      console.log("GET PROJECT: ", response);

      if (response.data) {
        setProject(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  // CREATE Projects
  const createProject = async (projectForm, slug) => {
    console.log("SLUG :", slug);
    try {
      const response = await axios.post(
        BASE_URL + `workspace/${slug}/project`,
        projectForm,
        configToken
      );
      console.log("CREATE NEW PROJ: ", response);

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Create todo

  const createTodo = async (todoForm, slug, projectId) => {
    try {
      const data = {
        ...todoForm,
        priority: todoForm.priority.sid,
        status: todoForm.status.sid,
        label: todoForm.label.map((item) => item._id),
      };

      const response = await axios.post(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo`,
        data,
        configToken
      );
      console.log("CREATE NEW TODO :", response);
      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get todos

  const getTodos = async (slug, projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo`,
        configToken
      );
      console.log("GET Todos: ", response);

      if (response.data) {
        setTodo(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get todo by Id

  const getTodoById = async (slug, projectId, todoId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo/${todoId}`,
        configToken
      );
      console.log("GET Todos: ", response);

      if (response.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Update todo
  const updateTodo = async (slug, projectId, todoId, todoForm) => {
    try {
      const data = {
        ...todoForm,
        priority: todoForm.priority.sid.toString(),
        status: todoForm.status.sid.toString(),
        label: todoForm.label.map((item) => item._id),
      };

      const response = await axios.put(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo/${todoId}`,
        data,
        configToken
      );
      console.log("Update Todos: ", response);

      if (response.data) {
        toast.success("Successfully updated!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Delete Todo
  const deleteTodo = async (slug, projectId, todoId) => {
    try {
      const response = await axios.delete(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo/${todoId}`,
        configToken
      );
      console.log("DELETE Todo: ", response);

      if (response.data) {
        toast.success("Successfully deleted!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Add Todo Attachments
  const addTodoAttachment = async (slug, projectId, todoId) => {
    try {
      const response = await axios.post(
        BASE_URL +
          `workspace/${slug}/project/${projectId}/todo/${todoId}/attachment`,
        configToken
      );
      console.log("POST ADD TODO ATTACHMENT: ", response);

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get Labels
  const getLabels = async (slug, projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/label`,
        configToken
      );
      console.log("GET Labels: ", response);

      if (response.data) {
        setLabels(response.data.data);
      }
      // if (response.data && Array.isArray(response.data.data)) {
      //   setLabels(response.data.data);
      // }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //create label
  const createLabel = async (labelForm, slug, projectId) => {
    console.log("SLUG :", labelForm, slug, projectId);
    try {
      const response = await axios.post(
        BASE_URL + `workspace/${slug}/project/${projectId}/label`,
        labelForm,
        configToken
      );
      console.log("CREATE NEW label: ", response);

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get Todo History
  const getTodoHistory = async (slug, projectId, todoId) => {
    try {
      const response = await axios.get(
        BASE_URL +
          `workspace/${slug}/project/${projectId}/todo/${todoId}/history`,
        configToken
      );
      console.log("GET Todo History: ", response);

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Create Comments
  const createComment = async (slug, projectId, todoId, comment, parent) => {
    try {
      const response = await axios.post(
        BASE_URL +
          `workspace/${slug}/project/${projectId}/todo/${todoId}/comment`,
        { parent: parent, content: comment },
        configToken
      );
      console.log("CREATE NEW Comment: ", response);

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      return false;
      console.log("error", error);
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
        openProjectModal,
        setOpenProjectModal,
        createProject,
        currentWorkspace,
        setCurrentWorkspace,
        todo,
        setTodo,
        openTodoModal,
        setOpenTodoModal,
        openLabelModal,
        setOpenLabelModal,
        createLabel,
        createTodo,
        getLabels,
        getTodoById,
        updateTodo,
        deleteTodo,
        logoutUser,
        uploadUserAvatar,
        getMe,
        getTodoHistory,
        createComment,
        updateUser,
        getMembers, 
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
