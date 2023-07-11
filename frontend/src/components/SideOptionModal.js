import React from 'react'
import styles from "./SideOptionModal.module.css"

function SideOptionModal() {
  return (
    <div className={styles.sideModalOverlay}>
      <div className={styles.sideModalContainer}>
        <div className={styles.sideModalContent}></div>
      </div>
    </div>
  )
}

export default SideOptionModal
