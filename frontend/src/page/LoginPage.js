import React, { useState } from 'react'
import styles from '../page/LoginPage.module.css'
import { useGlobalContext } from "../context";

function LoginPage() {
    const {
        loginUser, createTodo, getTodos
      } = useGlobalContext();

    const [loginForm, setLoginForm] = useState({
        email:"", 
        password:""
    })

    const [todoForm, setTodoForm] = useState({
        text: ""
    })

    const {
        email,
        password,
    } = loginForm

    const {text}=todoForm

    const handleFormChange = (e) => {
        setLoginForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })); 
    }

    const handleFormChange2 = (e) => {
        setTodoForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })); 
    }
    
    const handleLoginButton=()=>{
        loginUser(loginForm)
    }

    const handleCreateButton=()=>{
        createTodo(todoForm)
    }

    const handleGetTodos = () => {
        getTodos()
    }

  return (
    <div className={styles.LoginPageContainer}>
        <h2>Login page</h2>
        <input 
            name='email'
            value={email}
            onChange={handleFormChange}
            placeholder='아이디를 입력하세요'
        />
        <input
            name='password'
            value={password}
            onChange={handleFormChange}
            placeholder='비밀번호를 입력하세요'
        />
        <button onClick={()=>handleLoginButton()}>입력</button>


        <h2>Create Todo</h2>
        <input 
            name='text'
            value={text}
            onChange={handleFormChange2}
            placeholder='todo text'
        />
        
        <button onClick={()=>handleCreateButton()}>입력</button>

        <div>
            <button onClick={() => handleGetTodos()}>GET TODOS</button>
        </div>
    </div>
  )
}

export default LoginPage