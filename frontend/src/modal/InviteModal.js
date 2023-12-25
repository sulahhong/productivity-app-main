import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./InviteModal.module.css";
import { MdOutlineClose, MdAdd } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useGlobalContext } from "../context";
import MemberRoleDropdown from "./Dropdown/MemberRoleDropdown";

function InviteModal() {
  const { openInviteModal, setOpenInviteModal, inviteWorkspace } = useGlobalContext();

  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "MEMBER"
  })

  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];

  const handleOverlayClose = (e) => {
    if (e.target.id == "overlay") {
        setOpenInviteModal(false);
    }
  };

  const handleChange = (e) => {
    console.log("invite Change", e.target.value)

    setInviteForm({
        ...inviteForm, email: e.target.value
    })
  }

  const handleInviteWorkspace = async() => {
    const success = await inviteWorkspace(slug, inviteForm)

    if(success) {
        await setOpenInviteModal(false)
        // await setInviteForm({
        //     email: "",
        //     role: "MEMBER"
        //   })
    }
  }

  return (
    <div className={styles.inviteModalOverlay} onClick={(e) => handleOverlayClose(e)}
    id="overlay">
      <div className={styles.inviteModalContainer}>
        <div className={styles.inviteModalMain}>
            <h1 className={styles.inviteModalMainTitle}>Invite people to collaborate</h1>
            {/* <button className={styles.inviteModalClose}><MdOutlineClose /></button> */}
        </div>
            <p className={styles.inviteModalMainDes}>Invite members to work on your workspace.</p>
        <div  className={styles.inviteModalMainInputBox}>
        <div className={styles.inviteModalMainInputItem}>
            <input className={styles.inviteModalMainInput} placeholder="Enter their email..." value={inviteForm.email} onChange={handleChange} />
            <div className={styles.inviteModalMainMemberDropdown}>
            <MemberRoleDropdown  inviteForm = {inviteForm} setInviteForm={setInviteForm}/>
            </div>
        </div>
        </div>

        <div className={styles.inviteModalFooter}>
            <button className={styles.inviteModalBtn} onClick={handleInviteWorkspace}>Send Invitation</button>
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
