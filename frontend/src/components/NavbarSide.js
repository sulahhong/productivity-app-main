import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegListAlt,
  FaUserCircle,
  FaRegStar,
  FaRegEdit,
  FaSearch,
} from "react-icons/fa";

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
    viewCategory,
    setViewCategory,
    projectIsActive,
    setProjectIsActive,
    projectViewtype,
    setProjectviewType,
    targetProjectGlobal,
    setTargetProjectGlobal,
    isEditingProject,
    setIsEditingProject,
    user,
    openModal,
    setOpenModal,
    openWorkspaceModal,
    setOpenWorkspaceModal,
    logoutUser,
  } = useGlobalContext();

  const [openUserWorkspace, setOpenUserWorkspace] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);

  const navigate = useNavigate();

  let workspaceRef = useRef(null);
  let userProfileRef = useRef(null);

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!workspaceRef.current?.contains(e.target)) {
  //       setOpenUserWorkspace(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

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

  // const goDiary = () => {
  //   navigate('/diary');
  // };

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
    setOpenWorkspaceModal(!openWorkspaceModal)
  };

  const handleMyWorkspace = () => {
    navigate('/myworkspace')
  }

  const handleLogout = () => {

    logoutUser()
  }
  return (
    <div
      className={
        navbarSideIsOpen
          ? `${styles.navbarSideContainer} ${styles.navbarShow}`
          : styles.navbarSideContainer
      }
    >
      <div className={styles.navbarSideTopPart}>
        <div className={styles.navbarSideUserInfo}>
          <div
            className={styles.navbarSideUserWorkspace}
            onClick={() => setOpenUserWorkspace(!openUserWorkspace)}
          >
            <div className={styles.UserWorkspaceIcon}>
              <FaRegStar />
            </div>
            <div className={styles.UserWorkspaceName}
            // ref={workspaceRef}
            >workspace</div>
          </div>
          {openUserWorkspace && (
            <div className={styles.userWorkspaceContent}>
              <div className={styles.userWorkspaceContentItem}>
                Workspace :{user.userEmail}
              </div>
              <div className={styles.userWorkspaceContentItem}
                onClick={() => handleMyWorkspace()}
              >
                My Workspace
              </div>
              <div
                className={styles.userWorkspaceContentItem}
                onClick={() => handleCreateWorkspace()}
              >
                <MdAdd /> Create Workspace
              </div>
              <div className={styles.userWorkspaceContentItem}>
                Workspace Settings
              </div>
              <div className={styles.userWorkspaceContentItem}>
                Workspace Invites
              </div>
              <div className={styles.userWorkspaceContentItem} 
              onClick={() => handleLogout()}
              >Logout</div>
            </div>
          )}
     
          <div
            className={styles.navbarSideUserProfile}
            // ref={userProfileRef}
            onClick={() => setOpenUserProfile(!openUserProfile)}
          >
            <FaUserCircle />
          </div>
          {openUserProfile && (
            <div className={styles.userProfileContent}>
              <div className={styles.userProfileContentItem1}>
                <div className={styles.userProfileContentItem1}>
                  <FaUserCircle />
                </div>
                <div className={styles.userProfileContentItem1}>
                  {user.userName}
                </div>
              </div>

              <div className={styles.userProfileContentItem}>View profile</div>
              <div className={styles.userProfileContentItem} 
               onClick={() => handleLogout()}
              >Logout</div>
            </div>
          )}
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
      </div>
    </div>
  );
}

export default NavbarSide;
