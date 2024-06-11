import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";

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
  const [navbarSideSettingsIsOpen, setNavbarSideSettingsIsOpen] = useState(false);
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
  const [openInviteModal, setOpenInviteModal] = useState(false);

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

  const configToken = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const navigate = useNavigate();

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
  const registerUser = async (registerForm, inviteInfo) => {
    try {
      let inviteParam = inviteInfo ? inviteInfo : "";

      const response = await axios.post(
        BASE_URL + "users/register" + inviteParam,
        registerForm
      );
      console.log("REGISTER RES: ", response);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Successfully created!");

        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else {
          navigate("/myworkspace");
        }
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

  //Get User Activity 
  const getUserActivity = async () => {
    try {
      const response = await axios.get(
        BASE_URL + 'users/me/activity',
        configToken
      );
      console.log("GET user activity: ", response);

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get Project Members
  const getProjectMembers = async (slug, projectId) => {
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
        return response.data.data;
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

  //Update Workspace
  const updateWorkspaceSetting = async (workspaceForm, slug) => {
    try {
      const response = await axios.put(
        BASE_URL + `workspace/${slug}`,
        workspaceForm,
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

  //Set Workspace Logo
  const setWorkspaceLogo = async (workspaceForm, slug) => {
    try {
      const response = await axios.post(
        BASE_URL + `workspace/${slug}/logo`,
        workspaceForm,
        configToken
      );
      console.log("SET Workspace logo: ", response);

      if (response.data) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  //Delete Workspace 
  const deleteWorkspace = async (slug) => {
    try {
      const response = await axios.delete(
        BASE_URL + `workspace/${slug}`,
        configToken
      );
      console.log("Delete Workspace : ", response);

      if (response.data) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

// Get workspace members
const getWorkspaceMembers = async (slug) => {
  try {
    const response = await axios.get(
      BASE_URL + `workspace/${slug}/members`,
      configToken
    );
    console.log("GET workspace members: ", response);

    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    return toast.error(error.response.data.message);
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

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //GET project Self
  const getProjectSelf = async (slug, projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/me`,
        configToken
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  // join project
  const joinProject = async (slug, projectId) => {
    try {
      let data = {};
      const response = await axios.post(
        BASE_URL + `workspace/${slug}/project/${projectId}/join`,
        data,
        configToken
      );
      console.log("JOIN Project: ", response);

      if (response.data) {
        return response.data;
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
        label: todoForm.label?.map((item) => item._id) || [],
        assignee: todoForm.assignee?.map((item) => item._id) || [],
        parent: todoForm.parent,
      };

      const response = await axios.post(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo`,
        data,
        configToken
      );
      console.log("CREATE NEW TODO :", response);
      if (response?.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data.message);
    }
  };

  //Get todos

  const getTodos = async (slug, projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo`,
        configToken
      );
      if (response.data) {
        setTodo(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  //Get Todos Dropdown
  const getTodosDropdown = async (slug, projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo`,
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
      console.log("TODOFORM", todoForm);
      const data = {
        ...todoForm,
        priority: todoForm.priority.sid.toString(),
        status: todoForm.status.sid.toString(),
        label: todoForm.label.map((item) => item._id),
        assignee: todoForm.assignee.map((item) => item._id),
        parent: todoForm.parent ? todoForm.parent._id : null,
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
  const addTodoAttachment = async (slug, projectId, todoId, file) => {
    try {
      const formData = new FormData();
      formData.append("attachment", file);

      const response = await axios.post(
        BASE_URL +
          `workspace/${slug}/project/${projectId}/todo/${todoId}/attachment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // 필수: 파일을 업로드할 때는 Content-Type을 지정해야함
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
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

  //GET Todo Attachments
  const getTodoAttachment = async (slug, projectId, todoId) => {
    try {
      const response = await axios.get(
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

  // Delete Todo Attachments
  const deleteTodoAttachments = async (
    slug,
    projectId,
    todoId,
    attachmentId
  ) => {
    try {
      const response = await axios.delete(
        BASE_URL +
          `workspace/${slug}/project/${projectId}/todo/${todoId}/attachment/${attachmentId}`,
        configToken
      );
      console.log("DELETE Todo Attachment: ", response);

      if (response.data) {
        toast.success("Successfully deleted!");
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
    try {
      const response = await axios.post(
        BASE_URL + `workspace/${slug}/project/${projectId}/label`,
        labelForm,
        configToken
      );

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  // Get SubTodos
  const getSubTodos = async (slug, projectId, todoId) => {
    try {
      const response = await axios.get(
        BASE_URL + `workspace/${slug}/project/${projectId}/todo/${todoId}/subtodo`,
        configToken
      );

      if (response.data) {
        return response.data;
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

      if (response.data) {
        toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  // Invite Workspace
  const inviteWorkspace = async (slug, inviteForm) => {
    try {
      const data = {
        user: [
          {
            email: inviteForm.email,
            role: inviteForm.role,
          },
        ],
      };
      const response = await axios.post(
        BASE_URL + `workspace/${slug}/invite`,
        data,
        configToken
      );

      if (response.data) {
        console.log("GG");

        if (response.data.notEmail.length > 0) {
          const notEmail = response.data.notEmail;
          let list = "";
          for (let i = 0; i < notEmail.length; i++) {
            list = list + notEmail[i];
          }
          console.log("HH!", list);
          toast.error(`Following are not email: ${list}`);
        }

        if (response.data.sentList.length > 0) {
          const sentList = response.data.sentList;
          let list = "";
          for (let i = 0; i < sentList.length; i++) {
            list = list + sentList[i];
          }

          toast.error(`Following are sentList: ${list}`);
        }

        if (response.data.inviteExists.length > 0) {
          const inviteExists = response.data.inviteExists;
          let list = "";
          for (let i = 0; i < inviteExists.length; i++) {
            list = list + inviteExists[i];
          }

          toast.error(`Following are inviteExists: ${list}`);
        }

        if (response.data.memberExists.length > 0) {
          const memberExists = response.data.memberExists;
          let list = "";
          for (let i = 0; i < memberExists.length; i++) {
            list = list + memberExists[i];
          }

          toast.error(`Following are memberExists: ${list}`);
        }

        // toast.success("Successfully created!");
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  // Join Workspace
  const respondWorkspaceInvitation = async (joinYn, inviteId) => {
    try {
      const data = {
        joinYn: joinYn,
      };
      const response = await axios.post(
        BASE_URL + `workspace/join/${inviteId}`,
        data,
        configToken
      );

      if (response.data) {
        toast.success("Successfully created!");
        navigate("/myworkspace");
      }
    } catch (error) {
      if (error.response.data.redirectUrl) {
        navigate(error.response.data.redirectUrl);
      }
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  // Get User Notifications
  const getUserNotifications = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "users/notification?size=10",
        configToken
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
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
        getProjectMembers,
        openInviteModal,
        setOpenInviteModal,
        inviteWorkspace,
        respondWorkspaceInvitation,
        getProjectSelf,
        joinProject,
        addTodoAttachment,
        getTodoAttachment,
        getTodosDropdown,
        getUserNotifications,
        updateWorkspaceSetting,
        setWorkspaceLogo,
        deleteTodoAttachments,
        navbarSideSettingsIsOpen,
        setNavbarSideSettingsIsOpen,
        deleteWorkspace,
        getWorkspaceMembers,
        getUserActivity, 
        getSubTodos, 
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
