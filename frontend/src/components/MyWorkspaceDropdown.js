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
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

function MyWorkspaceDropdown({profile, setProfile}) {
  const {
    openWorkspaceModal,
    setOpenWorkspaceModal,
    getJoinedWorkspace,
    logoutUser,
    getMe,
    workspace,
    setWorkspace,
    getProjectByWspace,
  } = useGlobalContext();

  const navigate = useNavigate();
  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];
  const projectId = pathSegments[3];

  const handleGoToMyWorkspaceList = () => {
    navigate('/myworkspace')
  }

  const handleGoToWorkspace = () => {

  }

  const handleGoToMembersSettings = () => {
    navigate(`/${slug}/settings/members`)
  }

  const handleGoToWorkspaceSettings = () => {
    navigate(`/${slug}/settings`)
  }

  const handleCreateWorkspace = () => {
    setOpenWorkspaceModal(!openWorkspaceModal)
  };


  const handleLogout = () => {

    logoutUser()
  }

  const handleGoToSingleWorkspace = (data) => {
    navigate(`/${data.slug}/project`)
    getProjectByWspace(data.slug)
  }

  // useEffect(() => {
  //   getJoinedWorkspace()
  // },[])

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

  const checker = (data,) => {
    console.log("CCCC", data.slug, slug)
    if (slug == data.slug) {
        return true;
    } else {
        return false;
    }

}

  

  return (
    <div className={styles.mainContainer}>
        <Menu
            transition
            menuButton={
                <MenuButton className={styles.menuButton} onClick={() => getJoinedWorkspace()} ><MdHome className={styles.iconLayout} /> workspace</MenuButton>
              }
              menuClassName={menuClassName}
        >
          <MenuItem onClick={handleGoToMyWorkspaceList}>My Workspace :</MenuItem>
            {workspace?.map((item) => (
              <MenuItem onClick={() => handleGoToSingleWorkspace(item)}>
              <div>{item.name}</div>
              <div>{checker(item) && <MdCheck />}</div>
              </MenuItem>
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