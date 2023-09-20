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
import ProjectModal from "./components/ProjectModal";
import Archive from "./routes/Archive";
import EmptyProjectModal from "./components/EmptyProjectModal";
import TodoSinglePage from "./page/TodoSinglePage";
import SideOptionModal from "./components/SideOptionModal";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";




function App() {

  const { todos, setTodos, openModal, setOpenModal, openModalProject, setOpenModalProject, projectIsActive, projects, openSideModal} = useGlobalContext();

  return (
    <BrowserRouter>
      <NavbarTop />
      <NavbarSide />
      {openModal && <TodoModal />}
      {openModalProject && <ProjectModal /> }
      {openSideModal && <SideOptionModal />}
      {(projectIsActive && projects.length == 1) && <EmptyProjectModal/> }
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/todo/:id" element={<TodoSinglePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
