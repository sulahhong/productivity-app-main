import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NavbarSideSettings.module.css";
import { useGlobalContext } from "../context";
import {
  MdOutlineClose,
  MdKeyboardArrowLeft,
  MdVerticalSplit,
} from "react-icons/md";

function NavbarSideSettings() {
  const { navbarSideSettingsIsOpen, setNavbarSideSettingsIsOpen } =
    useGlobalContext();

  const navigate = useNavigate();
//   const {slug} = useParams();
  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];

  return (
    <div
      className={
        navbarSideSettingsIsOpen
          ? `${styles.navbarSideSettingsContainer} ${styles.navbarSettingsShow}`
          : styles.navbarSideSettingsContainer
      }
    >
      <div className={styles.header} onClick={() => navigate("/")}>
        <button className={styles.backButton}>
          <MdKeyboardArrowLeft />
        </button>
        <h1 className={styles.headerTitle}>Settings</h1>
      </div>
      <div className={styles.main}>
        <h2>Workspace</h2>
        <ul>
          <li onClick={() => navigate(`/${slug}/settings`)}>General</li>
          <li onClick={() => navigate(`/${slug}/settings/members`)}>Members</li>
        </ul>
      </div>
      <div className={styles.main}>
        <h2>My Account</h2>
        <ul>
          <li onClick={() => navigate(`/settings`)}>Profile</li>
          <li>Preferences</li>
          <li>Activity</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default NavbarSideSettings;
