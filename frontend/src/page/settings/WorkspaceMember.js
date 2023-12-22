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
import { useGlobalContext } from "../context";

function WorkspaceMember() {
    const {  } = useGlobalContext();    

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>Workspace</h1>
        <p className={styles.titleDes}>Manage your Workspace</p>
      </div>
      <div className={styles.workspacePhoto}>
        <div className={styles.workspaceWrapper} onClick={handleIconClick}>
          {avatar ? (
            <div className={styles.workspacePhoto}>
              <img className={styles.workspaceLogoItem} src={avatar} />
            </div>
          ) : (
            <div className={styles.defaultIcon}>
              <FaUserCircle />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Your Email</label>
          <input className={styles.itemInput} placeholder="email"
            name="email"
            value={email}
          />
        </div>
        <div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Your Name</label>
          <input className={styles.itemInput} placeholder="name" 
          name="name"
          value={name}
          onChange={handleSettingChange}
          />
        </div>
        <div className={styles.contentsItem}>
          <label className={styles.itemLabel}>Your Display Name</label>
          <input
            className={styles.itemInput}
            placeholder="displayName"
            name="displayName"
            value={displayName}
            onChange={handleSettingChange}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.saveBtn} onClick={handleUpdateUser}>Save</button>
      </div>
    </div>
  )
}

export default WorkspaceMember