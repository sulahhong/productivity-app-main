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
  const { getProjectMembers } = useGlobalContext();

  const [projectMembers, setprojectMembers] = useState([])

  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];
  const projectId = pathSegments[3];

  async function fetchData() {
    const data = await getProjectMembers(slug, projectId);
    console.log("GET MEMBERS ",data.data)
    if(data && data.data) {
      setprojectMembers(data.data)
    } 
  }

  useEffect(() => {
    fetchData() 
  },[])

  const handleAssignee = (selected) => {

    const selectedObj = projectMembers.find((item) => item._id === selected._id);

    let assignee = [...todoForm.assignee];

    let assigneeIndex = assignee.findIndex((item) => item._id === selectedObj._id);

    if (assigneeIndex == -1) {
      assignee.push(selectedObj);
    } else {
      assignee.splice(assigneeIndex, 1);
    }

    const updatedTodo = {
      ...todoForm,
      assignee: assignee,

    }
       setTodoForm(updatedTodo);
    if(todoForm._id){
      action(updatedTodo)
    }
  }

  const checker = (data) => {
    let assignee = [...todoForm.assignee];
    let assigneeIndex = assignee.findIndex((item) => item._id == data._id);

    if(assigneeIndex == -1) {
      return false ;
    } else {
      return true ;
    }
  }

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
        {/* <input placeholder="Type to search..." /> */}
        {projectMembers?.map((item) => (
          <MenuItem key={item._id} type="checkbox" onClick={() => handleAssignee(item)} >
            <div>{item.member.name}</div>
            <div>{checker(item) && <MdCheck />}</div>
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default AssigneeDropdown;
