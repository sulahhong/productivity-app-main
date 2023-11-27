import React, { useState } from 'react'
import styles from '../page/LoginPage.module.css'
import { useGlobalContext } from "../context";
import toast from 'react-hot-toast';

function LoginPage() {
    const {
        loginUser, createTodo, getTodos
      } = useGlobalContext();

    const [loginForm, setLoginForm] = useState({
        email:"", 
        password:""
    })

    const {
        email,
        password,
    } = loginForm


    const handleFormChange = (e) => {
        setLoginForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })); 
    } 

    
    const handleLoginButton=()=>{
        if(!email){
            toast.error("email")
            return
        }
        if(!password){
            toast.error("password!")
            return
        }
        loginUser(loginForm)
    }

  return (
    // <div className={styles.LoginPageContainer}>
    //     <h2>Login page</h2>
    //     <input 
    //         name='email'
    //         value={email}
    //         onChange={handleFormChange}
    //         placeholder='아이디를 입력하세요'
    //     />
    //     <input
    //         name='password'
    //         value={password}
    //         onChange={handleFormChange}
    //         placeholder='비밀번호를 입력하세요'
    //     />
    //     <button onClick={()=>handleLoginButton()}>입력</button>


    //     <h2>Create Todo</h2>
    //     <input 
    //         name='text'
    //         value={text}
    //         onChange={handleFormChange2}
    //         placeholder='todo text'
    //     />
        
    //     <button onClick={()=>handleCreateButton()}>입력</button>
    // </div>
    <div className={styles.mainOvelay}>
      <div className={styles.mainContainer}>
        <div className={styles.registerGreeting}>
          <div className={styles.registerGreetingItem1}>Welcome!</div>
          <div className={styles.registerGreetingItem2}>
            Login to get started
          </div>
        </div>
        <div className={styles.registerInfoWrapper}>

          <div className={styles.registerInfoWrapperItem}>
          <div className={styles.registerInfoWrapperLabelBox}>
            <label className={styles.registerInfoWrapperLabel}>
              Your Email
            </label>
            </div>
            <div className={styles.registerInfoWrapperInputBox}>
              <input
                className={styles.registerInfoWrapperInput}
                placeholder="please enter your email"
                name="email"
                value={email}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className={styles.registerInfoWrapperItem}>
          <div className={styles.registerInfoWrapperLabelBox}>
            <label className={styles.registerInfoWrapperLabel}>
              Your Password
            </label>
            </div>
            <div className={styles.registerInfoWrapperInputBox}>
              <input
                className={styles.registerInfoWrapperInput}
                type="password"
                placeholder="please enter your password"
                name="password"
                value={password}
                onChange={handleFormChange}
              />
            </div>
          </div>
 
          <div className={styles.registerInfoWrapperItemButtonBox}>
            <button className={styles.registerInfoWrapperItemButton}
              onClick={() => handleLoginButton()}
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage