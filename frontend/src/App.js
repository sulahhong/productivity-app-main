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




function App() {

  const { todos, setTodos, openModal, setOpenModal, openModalProject, setOpenModalProject, projectIsActive, projects, } = useGlobalContext();

  return (
    <BrowserRouter>
      <NavbarTop />
      <NavbarSide />
      {openModal && <TodoModal/>}
      {openModalProject && <ProjectModal /> }
      {(projectIsActive && projects.length == 1) && <EmptyProjectModal/> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
