import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./SubTask.module.css";
import { useGlobalContext } from "../context";

function SubTask({}) {
  const { subtask, setSubtask, onSubtask, setOnSubtask, checkFunc } = useGlobalContext();

  const [subtaskForm, setSubtaskForm] = useState({
    subtaskId: "",
    subtaskText: "",
    subtaskdone: false,
    subtaskCreateDate: "",
    postId: "",
  });

  const { subtaskId, subtaskText, subtaskdone, subtaskCreateDate, postId } =
    subtaskForm;

const handleSubtaskChange = (e) => {
 
}

useEffect(()=>{
console.log("SUBTASK", onSubtask)
}, [])


  return (
    <div className={styles.subTaskContainer}>
      <div className={styles.subTaskInputContainer}>
        <input className={styles.subTaskInput} placeholder="Task name" value={subtaskText} onChange={handleSubtaskChange}/>
      </div>
      <div className={styles.subTaskBtnGroup}>
        <button className={styles.subTaskBtn}>입력</button>
        <button className={styles.subTaskBtn} onClick={() => checkFunc()}>취소</button>
      </div>
    </div>
  );
}

export default SubTask;
