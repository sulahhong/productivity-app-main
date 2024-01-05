import React, { useEffect, useState, useRef } from "react";
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
import styles from "./MyWorkspaceDropdown.module.css";
import { MdGridView, MdCheck, MdOutlineClose, MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

function MyWorkspaceDropdown() {
  const {
    openWorkspaceModal,
    setOpenWorkspaceModal,
    getJoinedWorkspace,
    logoutUser,
    getMe,
    workspace,
    setWorkspace,
  } = useGlobalContext();
  const [profile, setProfile] = useState({})

  const navigate = useNavigate();

  const handleGoToMyWorkspaceList = () => {
    navigate('/myworkspace')
  }

  const handleGoToWorkspace = () => {

  }

  const handleGoToMembersSettings = () => {
    navigate('/settings/members')
  }

  const handleGoToWorkspaceSettings = () => {
    navigate('/settings/workspace')
  }

  const handleCreateWorkspace = () => {
    setOpenWorkspaceModal(!openWorkspaceModal)
  };


  const handleLogout = () => {

    logoutUser()
  }

  useEffect(() => {
    getJoinedWorkspace()
  },[])

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
            menuButton={
                <MenuButton className={styles.menuButton}><MdHome className={styles.iconLayout} /> workspace</MenuButton>
              }
              menuClassName={menuClassName}
        >
          <MenuItem onClick={handleGoToMyWorkspaceList}>My Workspace :</MenuItem>
            {workspace?.map((item) => (
              <MenuItem>{item.name}</MenuItem>
            ))}
          <MenuItem onClick={handleCreateWorkspace}>+ Create New Workspace</MenuItem>
          <MenuItem onClick={handleGoToWorkspaceSettings}>Workspace Settings</MenuItem>
          <MenuItem onClick={handleGoToMembersSettings}>Workspace Invites</MenuItem>
          <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        </Menu>
    </div>
  )
}

export default MyWorkspaceDropdown