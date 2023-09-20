import React, { useState } from "react";
import styles from "../page/RegisterPage.module.css";
import { useGlobalContext } from "../context";


function RegisterPage() {
  const { registerUser } = useGlobalContext();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2} = registerForm

  const handleFormChange = (e) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRegisterButton = () => {
    if(password != password2){
      console.log("password error!")
    }else{
      let data={
        name: name,
        email: email,
        password: password,
      }
      registerUser(data)
      console.log("user reg success")
      //go to main page
    }
  }

  return (
    <div className={styles.mainOvelay}>
      <div className={styles.mainContainer}>
        <div className={styles.registerGreeting}>
          <div className={styles.registerGreetingItem1}>Welcome!</div>
          <div className={styles.registerGreetingItem2}>
            Sign-up to get started
          </div>
        </div>
        <div className={styles.registerInfoWrapper}>
          <div className={styles.registerInfoWrapperItem}>
            <div className={styles.registerInfoWrapperLabelBox}>
            <label className={styles.registerInfoWrapperLabel}>Your Name</label>
            </div>
            <div className={styles.registerInfoWrapperInputBox}>
              <input
                className={styles.registerInfoWrapperInput}
                placeholder="please enter your name"
                name="name"
                value={name}
                onChange={handleFormChange}
              />
            </div>
          </div>
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
          <div className={styles.registerInfoWrapperItem}>
          <div className={styles.registerInfoWrapperLabelBox}>
            <label className={styles.registerInfoWrapperLabel}>
              Confirm Password
            </label>
            </div>
            <div className={styles.registerInfoWrapperInputBox}>
              <input
                className={styles.registerInfoWrapperInput}
                type="password"
                placeholder="please confirm password"
                name="password2"
                value={password2}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className={styles.registerInfoWrapperItemButtonBox}>
            <button className={styles.registerInfoWrapperItemButton}
              onClick={() => handleRegisterButton()}
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
