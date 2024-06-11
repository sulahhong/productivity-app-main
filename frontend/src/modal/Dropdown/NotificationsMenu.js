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
  const { user, getUserNotifications } = useGlobalContext();

  const [notifications, setNotifications] = useState([]);
  const [notiDropdown, setNotiDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("My Issues");

  let notificationRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!notificationRef.current?.contains(e.target)) {
        setNotiDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  async function fetchData() {
    const data = await getUserNotifications();
    setNotifications(data.data);
  }

  useEffect(() => {
    // user가 있으면 으로 조건 걸어야함
    if (user) fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderNotifications = () => {
    if (activeTab === "My Issues") {
      return notifications.map((list) => (
        <div className={styles.notiDropdownContentItem} key={list.id}>
          {list.message}
        </div>
      ));
    } else if (activeTab === "Created by me") {
      return notifications.map((list) => (
        <div className={styles.notiDropdownContentItem} key={list.id}>
          {list.message}
        </div>
      ));
    } else if (activeTab === "Subscribed") {
      return notifications.map((list) => (
        <div className={styles.notiDropdownContentItem} key={list.id}>
          {list.message}
        </div>
      ));
    }

    return null;
  };

  return (
    <div className={styles.parent}>
      <div
        className={styles.menu}
        onClick={() => setNotiDropdown(!notiDropdown)}
      >
        <div>
          <MdNotifications />
        </div>
        <div>Notifications</div>
      </div>
      {notiDropdown && (
        <div className={styles.notiDropdownContent} ref={notificationRef}>
          <div className={styles.notiDropdownHeader}>
            <div>notification</div>
            <div>
              <button className={styles.notiHeaderContent}>
                <MdOutlineClose />
              </button>
            </div>
          </div>
          <div className={styles.notiHeaderMenu}>
            <button
              className={`${styles.notiHeaderMenuItems} ${
                activeTab === "My Issues" ? styles.is_active : ""
              }`}
              onClick={() => handleTabClick("My Issues")}
            >
              My Issues
            </button>
            <button
              className={`${styles.notiHeaderMenuItems} ${
                activeTab === "Created by me" ? styles.is_active : ""
              }`}
              onClick={() => handleTabClick("Created by me")}
            >
              Created by me
            </button>
            <button
              className={`${styles.notiHeaderMenuItems} ${
                activeTab === "Subscribed" ? styles.is_active : ""
              }`}
              onClick={() => handleTabClick("Subscribed")}
            >
              Subscribed
            </button>
          </div>
          {renderNotifications()}
        </div>
      )}
    </div>
  );
}

export default NotificationsMenu;
