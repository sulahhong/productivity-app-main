import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  } = useGlobalContext();

  return (
    <>
      <NavbarTop />
      <NavbarSide />
      {openModal && <TodoModal />}
      {openProjectModal && <ProjectModal />}
      {openSideModal && <SideOptionModal />}
      {openWorkspaceModal && <WorkspaceModal />}
      {projectIsActive && projects.length == 1 && <EmptyProjectModal />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/todo/:id" element={<TodoSinglePage />} />
        <Route path="/myworkspace" element={<MyWorkspacePage />} />
        <Route path="/:slug/project" element={<MyProjectPage />} />
        <Route path="/:slug/project/:projectId" element={<MyTodoPage />} />
      </Routes>
      </>
  );
}

export default App;
