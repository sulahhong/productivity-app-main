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
import { MdGridView, MdCheck, MdOutlineClose } from "react-icons/md";

function MyWorkspaceDropdown() {

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
                <MenuButton className={styles.menuButton}></MenuButton>
              }
              menuClassName={menuClassName}
        >

        </Menu>
    </div>
  )
}

export default MyWorkspaceDropdown