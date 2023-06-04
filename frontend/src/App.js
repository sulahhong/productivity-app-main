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



function App() {

  const { todos, setTodos, openModal, setOpenModal, openModalProject, setOpenModalProject } = useGlobalContext();

  return (
    <BrowserRouter>
      <NavbarTop />
      <NavbarSide />
      {openModal && <TodoModal/>}
      {openModalProject && <ProjectModal /> }
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
