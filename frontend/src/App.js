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



function App() {

  const { todos, setTodos, openModal, setOpenModal } = useGlobalContext();

  return (
    <BrowserRouter>
      <NavbarTop />
      <NavbarSide />
      {openModal && <TodoModal/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
