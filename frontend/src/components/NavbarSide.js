import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NavbarSide.module.css";
import { useGlobalContext } from "../context";
import {
  MdKeyboardArrowDown,
  MdLabelImportant,
  MdAdd,
  MdKeyboardArrowRight,
  MdSpaceDashboard,
  MdGridView,
  MdLens,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineArchive,
  MdNotifications,
} from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegListAlt,
  FaUserCircle,
  FaRegStar,
  FaRegEdit,
  FaSearch,
} from "react-icons/fa";
import NotificationsMenu from "../modal/Dropdown/NotificationsMenu";
import MyWorkspaceDropdown from "./MyWorkspaceDropdown";
import ProfileDropdown from "./ProfileDropdown";

function NavbarSide() {
  const {
    navbarSideIsOpen,
    setNavbarSideIsOpen,
    projects,
    setProjects,
    todos,
    setTodos,
    setViewTodos,
    openModalProject,
    setOpenModalProject,
    projectIsActive,
    setProjectIsActive,
    setTargetProjectGlobal,
    setIsEditingProject,
    user,
    openModal,
    setOpenModal,
    openWorkspaceModal,
    setOpenWorkspaceModal,
    logoutUser,
    getMe,
    getJoinedWorkspace,
  } = useGlobalContext();

  const [openUserWorkspace, setOpenUserWorkspace] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [profile, setProfile] = useState({});
  
  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];

  const navigate = useNavigate();

  let workspaceRef = useRef(null);
  // let userProfileRef = useRef(null);

  async function fetchData() {
    const data = await getMe();
    console.log("NAVBAR HI", data);
    setProfile(data);

    if (window.location.pathname == "/") {
      navigate(`/${data.lastWorkspaceSlug}/project`);
    }
  }

  useEffect(() => {

    if(user){
      fetchData();
      console.log("loca", window.location);
    } 
   
  }, []);

  // useEffect(() => {
  //   fetchData()
  // }, [profile])

  useEffect(() => {
    let handler = (e) => {
      if (!workspaceRef.current?.contains(e.target)) {
        setOpenUserWorkspace(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!userProfileRef.current?.contains(e.target)) {
  //       setOpenUserProfile(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  const goHome = () => {
    navigate("/");
  };

  const goTodo = () => {
    navigate("/todo");
  };

  const goArchive = () => {
    navigate("/archive");
  };

  const handleProjectView = (item) => {
    console.log("projectView", item.projectId);

    const arr = todos.filter((todo) => todo.projectId == item.projectId);
    console.log("filterprojectId", arr);
    setViewTodos(arr);
  };

  const handleAddNewProject = () => {
    setOpenModalProject(!openModalProject);
  };

  const projectHandler = () => {
    setProjectIsActive(!projectIsActive);
    setViewTodos(todos);
  };

  const handleEditProject = (id) => {
    console.log("edit project id", id);
    const targetProject = projects.find((item) => item.projectId === id);
    console.log("targetProject", targetProject, id);
    setOpenModalProject(!openModalProject);
    setTargetProjectGlobal(targetProject);
    setIsEditingProject(true);
  };

  const handleDeleteProject = (id) => {
    if (projects.length === 2) {
      setProjectIsActive(false);
    }
    console.log("DEL project id", id);
    const newArray = projects.filter((item) => item.projectId !== id);
    console.log("newProjects", newArray);

    setProjects(newArray);

    // const arrResetProjId = todos.filter((item) => item.projectId == id)
    // console.log("arrResetProj", arrResetProjId )

    const arr = todos.map((item) => {
      if (item.projectId === id) {
        return { ...item, projectId: "", projectTitle: "No Project" };
      }
      return item;
    });
    console.log("Arrr", arr);
    setTodos(arr);
  };

  const handleAddNewTodo = () => {
    setOpenModal(!openModal);
  };

  const handleCreateWorkspace = () => {
    setOpenWorkspaceModal(!openWorkspaceModal);
  };

  const handleMyWorkspace = () => {
    console.log("yyyyyyy");
    navigate("/myworkspace");
  };

  const handleGoToSettings = () => {
    navigate("/");
  };

  const handleGoToMembersSettings = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logoutUser();
  };

  const handleGoToLogin = () => {};

  const handleGoToRegister = () => {};

  return (
    <div
      className={
        navbarSideIsOpen
          ? `${styles.navbarSideContainer} ${styles.navbarShow}`
          : styles.navbarSideContainer
      }
    >
      <div className={styles.navbarSideTopPart}>
        <div className={styles.userSettings}>
          <MyWorkspaceDropdown />
          <ProfileDropdown profile={profile} setProfile={setProfile} slug={slug}/>
        </div>
        <div className={styles.navbarSideNewIssueBar}>
          <button
            className={styles.newIssuePart1}
            onClick={() => handleAddNewTodo()}
          >
            <FaRegEdit /> New Issue
          </button>
          <button className={styles.newIssuePart2}>
            <FaSearch />{" "}
          </button>
        </div>
      </div>
      <div className={styles.navbarSideContents}>
        <div className={styles.navbarSideItems} onClick={goHome}>
          <MdSpaceDashboard className={styles.navbarSideIcons} /> Dashboard
        </div>
        <div className={styles.navbarSideItems} onClick={goTodo}>
          <FaRegListAlt className={styles.navbarSideIcons} /> My Todolist
        </div>
        <div className={styles.navbarSideItems}>
          <FaRegCalendarAlt className={styles.navbarSideIcons} /> upcoming
        </div>
        <div className={styles.navbarSideItems}>
          <MdLabelImportant className={styles.navbarSideIcons} />
          filter & Labels
        </div>
        <div className={styles.navbarSideItems} onClick={goArchive}>
          <MdOutlineArchive className={styles.navbarSideIcons} />
          Archive
        </div>
        <div className={styles.navbarProject}>
          <div className={styles.navbarProjectTitle}>
            <MdGridView className={styles.navbarSideIcons} /> projects
          </div>
          <div className={styles.navbarProjectDrop}>
            <div
              className={styles.navbarProjectAdd}
              onClick={handleAddNewProject}
            >
              <MdAdd />
            </div>
            <div className={styles.navbarProjectArrow} onClick={projectHandler}>
              {projectIsActive ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </div>
          </div>
        </div>
        {projects.length > 1 &&
          projectIsActive &&
          projects.map((item) => {
            if (item.projectId !== "") {
              return (
                <div
                  onClick={() => handleProjectView(item)}
                  className={styles.navbarProjectMenu}
                >
                  <div className={styles.projectLeftPart}>
                    <div className={styles.projectLeftPart1}>
                      <MdLens />
                    </div>
                    <div className={styles.projectLeftPart2}>
                      {item.projectTitle}
                    </div>
                  </div>
                  <div className={styles.projectLeftPart}>
                    <div onClick={() => handleEditProject(item.projectId)}>
                      <MdOutlineEdit />
                    </div>
                    <div onClick={() => handleDeleteProject(item.projectId)}>
                      <MdOutlineDelete />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        <NotificationsMenu />
      </div>
    </div>
  );
}

export default NavbarSide;
