import React, { useEffect, useState, useRef } from "react";
import styles from "./AssigneeDropdown.module.css";
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
import { MdGridView, MdCheck, MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../context";

function AssigneeDropdown({ todoForm, setTodoForm, action }) {
  const { getMembers } = useGlobalContext();

  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];
  const projectId = pathSegments[3];

  useEffect(() => {
    getMembers(slug, projectId)
  },[])

  const MenuItem = (props) => (
    <MenuItemInner {...props} className={menuItemClassName} />
  );

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

  return (
    <div className={styles.assigneeMainContainer}>
      <Menu
        transition
        menuButton={
          <MenuButton className={styles.menuButton}>Assignees</MenuButton>
        }
        menuClassName={menuClassName}
      >
        <input placeholder="Type to search..." />
        <MenuItem></MenuItem>
      </Menu>
    </div>
  );
}

export default AssigneeDropdown;
