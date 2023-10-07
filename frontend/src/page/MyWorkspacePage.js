import React from 'react'
import styles from '../page/MyWorkspacePage.module.css'
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';

function MyWorkspacePage() {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.todoBody}>
        <div className={styles.todoGuideBar}>
          <div className={styles.todoGuideBarLeftside}>
            <button className={styles.todoGuideBarLeftItem}
            >
              <MdKeyboardArrowLeft />
            </button>
            <span className={styles.todoGuideBarLeftText}>My Workspace</span>
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
        </div>
    </div>
  )
}

export default MyWorkspacePage