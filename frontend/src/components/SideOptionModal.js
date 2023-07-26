import React, { useEffect } from 'react'
import styles from "./SideOptionModal.module.css"
import { useGlobalContext } from "../context";

function SideOptionModal({id, todoForm}) {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    targetTodoGlobal,
    setTargetTodoGlobal,
    setIsEditingTodo,
    isEditingTodo,
    viewTodos,
    setViewTodos,
    projects,
    setProjects,
  } = useGlobalContext();



  useEffect(() => {
    console.log("todotodoId", id, todoForm )
  }, [])

  return (
      <div className={styles.sideModalContainer}>
        <div className={styles.sideModalContent}>
            <div className={styles.sideModalBody}>  
            <div className={styles.sideModalTitle}>
                <div className={styles.sideModalTitleItem}>Priority</div>
                <div className={styles.sideModalTitleItem}>Date</div>
                <div className={styles.sideModalTitleItem}>Project</div>
            </div>
            </div>
        </div>
      </div>
  )
}

export default SideOptionModal
