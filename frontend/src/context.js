import React, { useState, useContext, useEffect } from 'react';

const AppContext = React.createContext()

const getLocalStorage = () => {
  let storage = localStorage.getItem("todoList");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {

const [todos, setTodos] = useState(getLocalStorage());  
const [targetTodoGlobal, setTargetTodoGlobal] = useState({});
const [isEditingTodo, setIsEditingTodo] = useState(false);
const [openModal, setOpenModal] = useState(false);

useEffect(() => {
  window.localStorage.setItem("todoList", JSON.stringify(todos));
}, [todos]);
   
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
      }}>
       {children}
   </AppContext.Provider>
)
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }