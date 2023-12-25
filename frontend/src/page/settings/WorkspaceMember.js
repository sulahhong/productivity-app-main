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

function WorkspaceMember() {
  const {openInviteModal, setOpenInviteModal} = useGlobalContext();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <h1 className={styles.headerItemTitle}>Members</h1>
        <div className={styles.headerMain}>
          <input className={styles.mainInput} placeholder="search..." />
          <button className={styles.addBtn} onClick={() => setOpenInviteModal(true)}>Add Member</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceMember;
