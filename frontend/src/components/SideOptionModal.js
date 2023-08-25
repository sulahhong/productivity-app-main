import React, { useEffect } from 'react'
import styles from "./SideOptionModal.module.css"
import { useGlobalContext } from "../context";
import PriorityDropdown from './PriorityDropdown';

function SideOptionModal({id, todoForm, setTodoForm}) {
 const {
        todos,
        setTodos,
        projects,
        targetTodoGlobal,
        setTargetTodoGlobal,
        comments,
        setComments,
        reply,
        setReply,
        subtask,
        setSubtask,
        user,
        setUser,
        priorityDropdown,
        setPriorityDropdown,
        dueDateDropdown,
        setDueDateDropdown,
        projectDropdown,
        setProjectDropdown,
        priority,
        setPriority,
        openSideModal, setOpenSideModal, 
      } = useGlobalContext();



  useEffect(() => {
    console.log("todotodoId", id, todoForm )
  }, [])

  return (
      <div className={styles.sideModalContainer}>
        <div className={styles.sideModalContent}>
        <div>
                <PriorityDropdown todoForm={todoForm} setTodoForm={setTodoForm} todoId={id}/>
                </div>
            <div className={styles.sideModalBody}>  
            <div className={styles.sideModalTitle}>
                <div className={styles.sideModalTitleItem}>Priority {todoForm?.priorityTitle}</div>
              
                <div className={styles.sideModalTitleItem}>Date</div>
                <div className={styles.sideModalTitleItem}>Project</div>
            </div>
            </div>
        </div>
      </div>
  )
}

export default SideOptionModal
