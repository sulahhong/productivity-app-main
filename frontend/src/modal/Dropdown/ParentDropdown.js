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
import styles from "./ParentDropdown.module.css";
import { MdGridView, MdCheck, MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../context";

function ParentDropdown({ todoForm, setTodoForm, action }) {
  const { getTodosDropdown } = useGlobalContext();

  const [todos, setTodos] = useState([])

  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];
  const projectId = pathSegments[3];

async function fetchData() {
    const data = await getTodosDropdown(slug, projectId);
    if(data && data.data) {
        //filter 
        setTodos(data.data)
    }
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


const handleParents = (item) => {
    let parent 

    if (todoForm.parent?._id === item._id) {
        parent = null ;
    } else {
        parent = item
    }

    let todo = {
        ...todoForm,
        ["parent"]: parent,
    };

    setTodoForm(todo);
    if(todoForm._id){
      action(todo)
    }
}

const checker = (data) => {
    // console.log("CCCC", data)
    if (todoForm.parent?._id == data._id) {
        return true;
    } else {
        return false;
    }
}

  return (
    <div className={styles.parantMainContainer}>
      <Menu
        transition
        direction="bottom"
        menuButton={
          <MenuButton className={styles.menuButton}>Parent</MenuButton>
        }
        menuClassName={menuClassName}
      >

        {todos?.map((item) => (
            <MenuItem key={item._id} type="checkbox" onClick={() => handleParents(item)}>
                <div>{item.project.identifier} - {item.sid}</div>
                <div>{checker(item) && <MdCheck />}</div>
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default ParentDropdown;
