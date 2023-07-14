import React from 'react'
import styles from "./SideOptionModal.module.css"

function SideOptionModal() {
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
