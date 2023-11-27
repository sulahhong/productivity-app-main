import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../page/MyWorkspacePage.module.css";
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";

function MyWorkspacePage() {
  const { getJoinedWorkspace, workspace } = useGlobalContext();

  useEffect(() => {
    getJoinedWorkspace();
  }, []);

  const navigate = useNavigate();

  const handleGotoWorkspace = (slug) => {
    navigate(`/${slug}/project`);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoGuideBar}>
          <div className={styles.todoGuideBarLeftside}>
            <button className={styles.todoGuideBarLeftItem}>
              <MdKeyboardArrowLeft />
            </button>
            <span className={styles.todoGuideBarLeftText}>My Workspace</span>
          </div>

          <div>
            <button className={styles.todoAddButton}>
              <MdAdd className={styles.todoAddIcon} />
              Add
            </button>
          </div>
        </div>
        <div className={styles.wspaceContent}>
          {workspace.length > 0 ? (
            workspace.map((item) => (
              <div
                className={styles.wspaceItem}
                onClick={() => handleGotoWorkspace(item.slug)}
              >
                <div className={styles.wspaceItem2}>
                    <div className={styles.wspaceLabel}>
                      joined</div>
                </div>
                <div className={styles.wspaceItem3}>
                  <div className={styles.wspaceTitle}>{item.slug}</div>
                  <div className={styles.wspaceName}>{item.name}</div>
                </div>
               
              </div>
            ))
          ) : (
            <div className={styles.wspaceContent}></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyWorkspacePage;
