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
import styles from "./NotificationsMenu.module.css";
import {
  MdGridView,
  MdCheck,
  MdOutlineClose,
  MdNotifications,
} from "react-icons/md";
import { useGlobalContext } from "../../context";

function NotificationsMenu() {
const { getUserNotifications } = useGlobalContext();

const [notifications, setNotifications] = useState([]);

async function fetchData() {
    const data = await getUserNotifications();
    setNotifications(data.data)
}

useEffect(() => {
    fetchData()
}, [])

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
          <MenuButton className={styles.menuButton}>
            <MdNotifications />
            Notifications
          </MenuButton>
        }
        menuClassName={menuClassName}
      >

        {notifications.map((item) => (
            <div>
                <MenuItem>{item.message}</MenuItem>
            </div>
        ))

        }
      </Menu>
    </div>
  );
}

export default NotificationsMenu;
