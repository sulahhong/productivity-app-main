import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../context";
import {  Menu,
  MenuButton,
  MenuDivider,
  MenuItem as MenuItemInner,
  SubMenu as SubMenuInner} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from "uuid";
import styles from "./LabelDropdown.module.css";

function LabelDropdown({ todoForm, setTodoForm, todoId, type }) {
  const { labels, setLabels, todos, setTodos } = useGlobalContext();

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [labelName, setLabelName] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const check = true;
  const createLabel = () => {
    const label = {
      labelId: uuidv4(),
      labelName: labelName,
      labelColor: color,
    };

    setLabels([...labels, label]);
    onCloseModal();
    setColor("#aabbcc");
    setLabelName("");
  };

  const handelLabelNameChange = (e) => {
    setLabelName(e.target.value);
  };

  const handleAddLabel = (selectedLabel) => {
    console.log("labelbbbbbb", selectedLabel);

    const selectedLabelObject = labels.find(
      (item) => item.labelId === selectedLabel.labelId
    );

    console.log("lalalala11", selectedLabelObject);

    console.log("todoForm.label", todoForm.label);

    let label = [...todoForm.label];

    let labelIndex = label.findIndex(
      (item) => item.labelId == selectedLabelObject.labelId
    );

    if (labelIndex == -1) {
      label.push(selectedLabelObject);
      // label = [...label,  selectedLabelObject]
    } else {
      label.splice(labelIndex, 1);
    }

    const updatedTodo = {
      ...todoForm,
      label: label,
    };

    console.log("updatedTodo", updatedTodo);

    setTodoForm(updatedTodo);
  };

  const checker = (data) => {
    console.log("CHECKER");
    let label = [...todoForm.label];
    let labelIndex = label.findIndex((item) => item.labelId == data.labelId);

    if (labelIndex == -1) {
      return false;
    } else {
      return true;
    }
  };

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

const SubMenu = (props) => (
  <SubMenuInner
    {...props}
    menuClassName={menuClassName}
    itemProps={{ className: submenuItemClassName }}
    offsetY={-7}
  />
);

  return (
    <div>
      <Menu transition
        menuButton={<MenuButton className={styles.menuButton}>Label</MenuButton>}
        menuClassName={menuClassName}
      >
        {labels.map((item) => (
          <MenuItem
            type="checkbox"
            checked={checker(item)}
            onClick={() => handleAddLabel(item)}
          >
            <div
              className={styles.circle}
              style={{ backgroundColor: item.labelColor }}
            ></div>
            <div>{item.labelName}</div>
          </MenuItem>
        ))}
        <MenuItem onClick={onOpenModal}>Create Label</MenuItem>
      </Menu>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
        <HexColorPicker color={color} onChange={setColor} />
        <input
          placeholder="이름을 입력하세요"
          value={labelName}
          onChange={handelLabelNameChange}
        />
        <button onClick={createLabel}>입력</button>
      </Modal>
    </div>
  );
}

export default LabelDropdown;
