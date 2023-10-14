import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./WorkspaceModal.module.css";
import { useGlobalContext } from "../context";
import { MdOutlineClose, MdAdd } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

function WorkspaceModal() {
  const { setOpenWorkspaceModal, openWorkspaceModal, createWorkspace , getJoinedWorkspace} = useGlobalContext();

  const [workspaceForm, setWorkspaceForm] = useState({
    name: "",
    slug: "",
  });

  const { name, slug } = workspaceForm;

  const handleOverlayClose = (e) => {
    if (e.target.id == "overlay") {
      setOpenWorkspaceModal(false);
    }
  };

  const handleWorkspaceChange = (e) => {
    setWorkspaceForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateWorkspace = async() => {
   const success= await createWorkspace(workspaceForm)

   if (success){
    await setOpenWorkspaceModal(false)
    await getJoinedWorkspace()
   }


  }

  return (
    <div
      className={styles.workspaceModalOverlay}
      onClick={(e) => handleOverlayClose(e)}
      id="overlay"
    >
      <div className={styles.workspaceModalContainer}>
        <div className={styles.workspaceModalHeader}>
          <div className={styles.workspaceModalHeaderTitle}>
            Create Workspace
          </div>
          <button className={styles.workspaceModalCloseButton}
            onClick={() => {setOpenWorkspaceModal(!openWorkspaceModal)}}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className={styles.workspaceModalBody}>
            <div className={styles.workspaceModalInputBox}>
              <div className={styles.inputWrapperLabelBox}>
                <label className={styles.inputWrapperLabel}>
                  Your Workspace Name
                </label>
              </div>
              <div className={styles.WrapperInputBox}>
                <input
                  className={styles.workspaceModalInputItem}
                  name="name"
                  placeholder="Workspace Name"
                  value={name}
                  onChange={handleWorkspaceChange}
                />
                </div>
              </div>
            <div className={styles.workspaceModalInputBox}>
              <div className={styles.inputWrapperLabelBox}>
                <label className={styles.inputWrapperLabel}>
                  Your Workspace Slug
                </label>
              </div>
              <div className={styles.WrapperInputBox}>
                <input
                  className={styles.workspaceModalInputItem}
                  name="slug"
                  placeholder="Workspace Slug"
                  value={slug}
                  onChange={handleWorkspaceChange}
                />
                </div>
            </div>
          
        </div>
        <div className={styles.WrapperItemButtonBox}>
        <button className={styles.WrapperItemButton}
            onClick={() => handleCreateWorkspace()}
            >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceModal;
