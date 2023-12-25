import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./JoinWorkspacePage.module.css";
import { MdOutlineClose, MdAdd } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useGlobalContext } from "../context";

function JoinWorkspacePage() {
    const { respondWorkspaceInvitation } = useGlobalContext();

    const path = window.location.pathname;
    const pathSegments = path.split('/');
    const inviteId = pathSegments[2]

    const handleResponse = async (response) => {
        await respondWorkspaceInvitation(response, inviteId)
    }


  return (
    <div className={styles.mainOverlay}>
        <div className={styles.mainWrapper}>
            <div className={styles.mainTitle}>
                <h1>You have been invited to anothertest</h1>
            </div>
        <div className={styles.mainBox}>
            <div className={styles.mainBoxItem} onClick={() => handleResponse(true)}><button>Accept</button></div>
            <div className={styles.mainBoxItem} onClick={() => handleResponse(false)}><button>Ignore</button></div>
        </div>
        </div>
    </div>
  )
}

export default JoinWorkspacePage