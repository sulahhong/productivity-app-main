import React from 'react'
import styles from "./EmptyProjectModal.module.css";
import { useGlobalContext } from '../context';



function EmptyProjectModal() {

const {projectIsActive, setProjectIsActive, } = useGlobalContext();

const handleOverlayClose = (e) => {
    // console.log("overlay Close")
    if(e.target.id == "overlay") {
        setProjectIsActive(false);
    }
}

  return (
    <div className={styles.emptyModalOverlay} id="overlay" onClick={(e) => handleOverlayClose(e)}>
        <div className={styles.emptyModalContainer}>
            <div className={styles.emptyModalHeader}>No Project</div>
        </div>
    </div>
  )
}

export default EmptyProjectModal
