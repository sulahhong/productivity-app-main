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
import { useParams } from "react-router-dom";

function WorkspaceMember() {
  const { openInviteModal, setOpenInviteModal, getWorkspaceMembers } =
    useGlobalContext();

  const [workspaceMembers, setWorkspaceMembers] = useState([]);

  const { slug } = useParams();
  console.log("PARAMS", slug);

  async function fetchData() {
    const data = await getWorkspaceMembers(slug);
    console.log("MEMEBERS", data);
    setWorkspaceMembers(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <h1 className={styles.headerItemTitle}>Members</h1>
          <div className={styles.headerMain}>
            <input className={styles.mainInput} placeholder="search..." />
            <button
              className={styles.addBtn}
              onClick={() => setOpenInviteModal(true)}
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
      <div className={styles.memberMain}>
        {workspaceMembers?.map((item) => (
          <div className={styles.memberMainBox}>
            <div className={styles.memberAvatarBox}>
              <img className={styles.memberAvatarBoxItem} src={item.member.detail.avatar} />
            </div>
            <div className={styles.memberInnerBox}>
            <div>{item.member.detail.displayName}</div>
            <div>{item.member.email}</div>
            <div>{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkspaceMember;
