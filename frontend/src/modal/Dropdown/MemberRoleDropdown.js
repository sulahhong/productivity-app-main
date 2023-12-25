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
import { Modal } from "react-responsive-modal";
import styles from "./MemberRoleDropdown.module.css";
import { MdGridView, MdCheck, MdOutlineClose, MdKeyboardArrowDown } from "react-icons/md";

function MemberDropdown({inviteForm, setInviteForm}) {

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

      const MenuItem = (props) => (
        <MenuItemInner {...props} className={menuItemClassName} />
      );

      const handleRole = (e) => {
        console.log("EEE", e.value)
        setInviteForm({...inviteForm, role: e.value})
      }

  return (
    <div className={styles.memberDropdownContainer}>
        <Menu
        transition
        menuButton={
          <MenuButton className={styles.menuButton}>Member <MdKeyboardArrowDown /> </MenuButton>
        }
        menuClassName={menuClassName}
      >
          {/* <MenuItem
            key={item._id}
            type="checkbox"
            onClick={}
          >
          </MenuItem> */}
        
        <MenuItem value="GUEST" onClick={handleRole}>Guest</MenuItem>
        <MenuItem value="VIEWER" onClick={handleRole}>Viewer</MenuItem>
        <MenuItem value="MEMBER" onClick={handleRole}>Member</MenuItem>
        <MenuItem value="ADMIN" onClick={handleRole}>Admin</MenuItem>
      </Menu>
    </div>
  )
}

export default MemberDropdown