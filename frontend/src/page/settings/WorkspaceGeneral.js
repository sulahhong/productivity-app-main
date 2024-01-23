import React, { useEffect, useRef, useState } from "react";
import styles from "./WorkspaceMember.module.css";
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

function WorkspaceGeneral() {
  const { updateWorkspaceSetting, setWorkspaceLogo, getJoinedWorkspace } =
    useGlobalContext();
  const [workspaceForm, setWorkspaceForm] = useState({
  });

  const path = window.location.pathname;
  const pathSegments = path.split("/");

  const slug = pathSegments[1];
  const projectId = pathSegments[3];

  console.log("SLUG CHECK", slug);

  async function fetchData() {
    const data = await getJoinedWorkspace();
    console.log("NAVBAR HI", data);

    let findWorkspace = data.filter((item) => item.slug == slug);

    console.log("FILTER", findWorkspace);

    setWorkspaceForm(findWorkspace[0]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSettingChange = (e) => {
    setWorkspaceForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
}

  const handleIconClick = () => {};

  const handleUpdateWorkspace = () => {
    updateWorkspaceSetting(workspaceForm, slug)
  };

  const handleImageChange = () => {

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>Workspace</h1>
        <p className={styles.titleDes}>Manage your Workspace</p>
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
        <label className={styles.itemLabel}>Workspace Name</label>
        <input
          className={styles.itemInput}
          placeholder="name"
          name="name"
          value={workspaceForm.name}
          onChange={handleSettingChange}
        />
      </div>
        <div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Slug Name</label>
          <input
            className={styles.itemInput}
            placeholder="slug"
            name="slug"
            value={workspaceForm.slug}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.saveBtn} onClick={handleUpdateWorkspace}>
          Update Workspace
        </button>
      </div>
        <div className={styles.footer}>Delete Workspace</div>
    </div>
  );
}

export default WorkspaceGeneral;
