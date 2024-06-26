import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem as MenuItemInner,
  SubMenu as SubMenuInner,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import styles from "./ProfileDropdown.module.css";
import { MdGridView, MdCheck, MdOutlineClose} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "../context";

function ProfileDropdown({profile, setProfile}) {
  const {
    logoutUser,
    getMe,
  } = useGlobalContext();

  const navigate = useNavigate();
  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];


  // async function fetchData() {
  //   const data = await getMe();
  //   setProfile(data)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const handleLogout = () => {

    logoutUser()
  }

  const handleGoToSettings = () => {
    navigate(`/${slug}/settings/user/me`)
  }


  const menuClassName = ({ state }) =>
  state === "opening"
    ? styles.menuOpening
    : state === "closing"
    ? styles.menuClosing
    : styles.menu;

const menuItemClassName = ({ hover, disabled }) =>
  disabled
    ? styles.menuItemDisabled
    : hover
    ? styles.menuItemHover
    : styles.menuItem;

const submenuItemClassName = (modifiers) =>
  `${styles.submenuItem} ${menuItemClassName(modifiers)}`;

const MenuItem = (props) => (
  <MenuItemInner {...props} className={menuItemClassName} />
);


  return (
    <div className={styles.mainContainer}>
    <Menu
        transition
        direction="right"
        gap={15}
        menuButton={
            <MenuButton className={styles.menuButton} >  {profile?.avatar ? (<div className={styles.userAvatar}><img src={profile.avatar}/></div>) :  <FaUserCircle />}</MenuButton>
          }
          menuClassName={menuClassName}
    >
      {/* <div >{profile.email}</div> */}
      <MenuItem>view profile</MenuItem>
      <MenuItem onClick={handleGoToSettings}>profile settings</MenuItem>
      <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
    </Menu>
</div>
  )
}

export default ProfileDropdown