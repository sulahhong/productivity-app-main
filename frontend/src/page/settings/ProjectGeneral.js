import React, { useEffect, useRef, useState } from "react";
import styles from "./ProjectSettings.module.css";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegListAlt,
  FaUserCircle,
  FaRegStar,
  FaRegEdit,
  FaSearch,
} from "react-icons/fa";
import { useGlobalContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";

function ProjectGeneral() {
  const { getJoinedWorkspace, deleteWorkspace, getJoinedProject, updateProjectSetting } =
    useGlobalContext();
	const [projectForm, setProjectForm] = useState({
	})


  const navigate = useNavigate();

  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const projectId = pathSegments[4];
  const { slug } = useParams();

	console.log("ProjectForm", projectForm)


	const getProjectData = async () => {
		const res = await getJoinedProject(slug);
		let findProject = res.data.filter((item) => item._id === projectId)
		console.log("projectself", res.data)
		console.log("CCCc", findProject)

		setProjectForm(findProject[0])
	}

  useEffect(() => {
		getProjectData()
  }, []);

  const handleSettingChange = (e) => {
    setProjectForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
}

const handleBoolChange = () => {
	setProjectForm((prevState) => ({
		...prevState,
		publicYn: !projectForm.publicYn,
 
	}));
}


const handleDeleteProject = async() => {
 
}

  const handleIconClick = () => {};

  const handleUpdateProject = () => {
    updateProjectSetting(projectForm, slug, projectId)
  };

  const handleImageChange = () => {

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>Project</h1>
        <p className={styles.titleDes}>Manage your Project</p>
      </div>
      <div className={styles.workspacePhoto}>
        <div className={styles.workspaceWrapper} onClick={handleIconClick}>
          {/* {avatar ? (
            <div className={styles.workspacePhoto}>
              <img className={styles.workspaceLogoItem} src={avatar} />
            </div>
          ) : ( */}
            <div className={styles.defaultIcon}>
              <FaUserCircle />
            </div>
          
          <input
            // ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
    

      <div className={styles.contents}>
      <div className={styles.contentsItem}>
        <label className={styles.itemLabel}>Title</label>
        <input
          className={styles.itemInput}
          placeholder="title"
          name="title"
          value={projectForm.title}
          onChange={handleSettingChange}
        />
      </div>
        <div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Description</label>
          <input
            className={styles.itemInput}
            placeholder="description"
            name="description"
            value={projectForm.description}
          />
        </div>
				<div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Identifier </label>
          <input
            className={styles.itemInput}
            placeholder="identifier"
            name="identifier"
            value={projectForm.identifier}
          />
        </div>
				<div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Public Y/N</label>
          <input type="checkbox" name="publicYn" checked={projectForm.publicYn} value={projectForm.publicYn} onChange={handleBoolChange}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.saveBtn} onClick={handleUpdateProject}>
          Update Project
        </button>
      </div>
        <div className={styles.footer} >
          <button className={styles.deleteBtn} onClick={handleDeleteProject} > Delete Project</button>
         </div>
    </div>
  );
}

export default ProjectGeneral;
