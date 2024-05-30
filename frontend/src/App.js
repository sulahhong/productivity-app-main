import React, { useEffect, useReducer, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import "./App.css";
import NavbarSide from "./components/NavbarSide";
import NavbarTop from "./components/NavbarTop";
import TodoModal from "./components/TodoModal";
import Diary from "./routes/Diary";
import Home from "./routes/Home";
import Todo from "./routes/Todo";
import { useGlobalContext } from "./context";

import Archive from "./routes/Archive";
import EmptyProjectModal from "./components/EmptyProjectModal";
import TodoSinglePage from "./page/TodoSinglePage";
import SideOptionModal from "./components/SideOptionModal";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import WorkspaceModal from "./modal/WorkspaceModal";
import MyWorkspacePage from "./page/MyWorkspacePage";
import MyProjectPage from "./page/MyProjectPage";
import ProjectModal from "./modal/ProjectModal";
import MyTodoPage from "./page/MyTodoPage";
import NewTodoModal from "./modal/NewTodoModal";
import LabelModal from "./modal/LabelModal";
import DetailPage from "./page/DetailPage";
import SettingPage from "./page/SettingPage";
import WorkspaceMember from "./page/settings/WorkspaceMember";
import InviteModal from "./modal/InviteModal";
import JoinWorkspacePage from "./page/JoinWorkspacePage";
import WorkspaceGeneral from "./page/settings/WorkspaceGeneral";
import MyDetailPage from "./page/MyDetailPage";
import NavbarSideSettings from "./components/NavbarSideSettings";
import Activity from "./page/Activity";

function App() {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    openModalProject,
    setOpenModalProject,
    projectIsActive,
    projects,
    openSideModal,
    openWorkspaceModal,
    setOpenWorkspaceModal,
    openProjectModal,
    openTodoModal,
    setOpenTodoModal,
    openLabelModal,
    setOpenLabelModal,
    openInviteModal,
    setOpenInviteModal,
  } = useGlobalContext();

  const location = useLocation();
  console.log("LOCATION", location)
  const isSettingsPage = location.pathname.includes("settings");

  console.log("useParams", useParams);

  return (
    <>
      <NavbarTop />

      {isSettingsPage ? <NavbarSideSettings /> : <NavbarSide />}



      {openModal && <TodoModal />}
      {openTodoModal && <NewTodoModal />}
      {openLabelModal && <LabelModal />}
      {openProjectModal && <ProjectModal />}
      {openSideModal && <SideOptionModal />}
      {openWorkspaceModal && <WorkspaceModal />}
      {openInviteModal && <InviteModal />}
      {projectIsActive && projects.length == 1 && <EmptyProjectModal />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/workspace-join/:inviteId"
          element={<JoinWorkspacePage />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/todo/:id" element={<TodoSinglePage />} />
        <Route path="/myworkspace" element={<MyWorkspacePage />} />
        <Route path="/:slug/project" element={<MyProjectPage />} />
        <Route path="/:slug/settings/user/me" element={<SettingPage />} />
        <Route path="/:slug/settings/workspace" element={<WorkspaceGeneral />} />
        <Route path="/:slug/settings/members" element={<WorkspaceMember />} />
        <Route path="/:slug/settings/user/me/activity" element={<Activity />} />
        <Route path="/:slug/project/:projectId" element={<MyTodoPage />} />
        <Route
          path="/:slug/project/:projectId/todo/:todoId"
          element={<DetailPage />}
        />
      </Routes>
    </>
  );
}

export default App;
