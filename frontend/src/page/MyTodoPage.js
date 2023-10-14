import React, { useState, useContext, useEffect } from "react";
import styles from '../page/MyWorkspacePage.module.css'
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';
import { useParams } from "react-router-dom";

function MyTodoPage() {

    const {getTodos, todo, setTodo, } = useGlobalContext();
    const { slug, projectId } = useParams();

    useEffect(() => {
        getTodos(slug, projectId)
    }, [])

  return (
    <div className={styles.mainContainer}>
    <div className={styles.todoBody}>
    <div className={styles.todoGuideBar}>
      <div className={styles.todoGuideBarLeftside}>
        <button className={styles.todoGuideBarLeftItem}
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className={styles.todoGuideBarLeftText}>My TodoList</span>
      </div>
       
        <div>
          <button
            className={styles.todoAddButton}
          >
            <MdAdd className={styles.todoAddIcon} />
            Add
          </button>
        </div>

    </div>
    <div className={styles.wspaceContent}>
        {todo?.length>0? todo.map((item) => (<div className={styles.wspaceItem}>{item.title}</div>)):<div className={styles.wspaceContent}>

</div>}
        </div>
    </div>
</div>
  )
}

export default MyTodoPage