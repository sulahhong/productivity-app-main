import React, { useState, useContext, useEffect } from "react";
import styles from '../page/MyWorkspacePage.module.css'
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate, useParams } from "react-router-dom";

function MyProjectPage() {

    const {getProjectByWspace, project, setOpenProjectModal, currentWorkspace, setCurrentWorkspace} = useGlobalContext();
    const { slug } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
        getProjectByWspace(slug)
        setCurrentWorkspace(slug)
    }, [])

    const handleGotoProject = (projectId) => {
        navigate(`/${slug}/project/${projectId}`)
    }


  return (
    <div className={styles.mainContainer}>
    <div className={styles.todoBody}>
    <div className={styles.todoGuideBar}>
      <div className={styles.todoGuideBarLeftside}>
        <button className={styles.todoGuideBarLeftItem}
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className={styles.todoGuideBarLeftText}>My Projects</span>
      </div>
       
        <div>
          <button
            className={styles.todoAddButton}
            onClick={() => setOpenProjectModal(true)}
          >
            <MdAdd className={styles.todoAddIcon} />
            Add
          </button>
        </div>

    </div>
    <div className={styles.wspaceContent}>
        {project?.length>0? project.map((item) => (<div className={styles.wspaceItem} onClick={() => handleGotoProject(item._id)} >{item.title}</div>)):<div className={styles.wspaceContent}>

</div>}
        </div>

    </div>
</div>
  )
}

export default MyProjectPage