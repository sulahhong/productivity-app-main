import React, { useState, useContext, useEffect } from "react";
import styles from "../page/MyWorkspacePage.module.css";
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import NewTodoModal from "../modal/NewTodoModal";

function MyTodoPage() {
  const { getTodos, todo, setTodo, openTodoModal, setOpenTodoModal, getLabels } =
    useGlobalContext();
  const { slug, projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTodos(slug, projectId);
    getLabels(slug, projectId)
  }, []);

  const handleGoBack = () => {
    navigate(`/${slug}/project`);
  };

  const dateFormatter = (date) => {
    const originalDate = new Date(date)
    
    const formattedDate = originalDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return formattedDate;
  }

const goToDetailPage = (todoId) => {
  console.log('Check todo Id' , todoId)
  navigate(`/${slug}/project/${projectId}/todo/${todoId}`)

}



  return (
    <div className={styles.mainContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoGuideBar}>
          <div className={styles.todoGuideBarLeftside}>
            <button
              className={styles.todoGuideBarLeftItem}
              onClick={() => handleGoBack()}
            >
              <MdKeyboardArrowLeft />
            </button>
            <span className={styles.todoGuideBarLeftText}>My TodoList</span>
          </div>

          <div>
            <button
              className={styles.todoAddButton}
              onClick={() => setOpenTodoModal(true)}
            >
              <MdAdd className={styles.todoAddIcon} />
              Add
            </button>
          </div>
        </div>
      </div>
      <div className={styles.todoFilter}>All Issues</div>
      <div className={styles.todoContent}>
        {todo?.length > 0 ? (
          todo.map((item) => (
            <div className={styles.todoSingleItem} >
              <div className={styles.todoItemTitle} 
              onClick={() => goToDetailPage(item._id)}>{item.title}</div>
              
              <div>{item.status?.title}</div>
              <div>{item.priority?.title}</div>
              <div>{item.label?.name}</div>
              <div>{dateFormatter(item.dueDate)}</div>
              {/* <div>{item.createBy.name}</div> */}
              <div></div>
            </div>
          ))
        ) : (
          <div className={styles.wspaceContent}></div>
        )}
      </div>
    </div>
  );
}

export default MyTodoPage;
