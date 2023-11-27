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
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from "uuid";
import styles from "./LabelDropdown.module.css";
import { MdGridView, MdCheck, MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../context";
import LabelModal from "../LabelModal";

function LabelDropdown({ todoForm, setTodoForm, action}) {
  const { labels, setLabels, todos, setTodos, openLabelModal, setOpenLabelModal, getLabels } = useGlobalContext();

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [labelName, setLabelName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const onOpenModal = () => setOpenLabelModal(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    console.log("Check the Labels" , labels)
  }, [])

  const check = true;
  // const createLabel = () => {
  //   const label = {
  //     id: uuidv4(),
  //     labelName: labelName,
  //     labelColor: color,
  //   };

  //   setLabels([...labels, label]);
  //   onCloseModal();
  //   setColor("#aabbcc");
  //   setLabelName("");
  // };

  const handelLabelNameChange = (e) => {
    setLabelName(e.target.value);
  };

  const handleAddLabel = (selectedLabel) => {
    console.log("check selectedLabel", selectedLabel);

    const selectedLabelObject = labels.find(
      (item) => item._id === selectedLabel._id
    );

    let label = [...todoForm.label];

    let labelIndex = label.findIndex(
      (item) => item._id == selectedLabelObject._id
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
    if(todoForm._id){
      action(updatedTodo)
    }
  };

  const checker = (data) => {
    console.log("CHECKER");
    let label = [...todoForm.label];
    let labelIndex = label.findIndex((item) => item._id == data._id);

    if (labelIndex == -1) {
      return false;
    } else {
      return true;
    }
  };

  const searchLabels = () => {
    return labels.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    <>
     {/* <Modal open={open} onClose={onCloseModal} center  classNames={{
          overlay: styles.customOverlay,
          modal:styles.customModal,
        }}>
        <h2>Simple centered modal</h2>
        <HexColorPicker color={color} onChange={setColor} />
        <input
          placeholder="이름을 입력하세요"
          value={labelName}
          onChange={handelLabelNameChange}
        />
        <button onClick={createLabel}>입력</button>
      </Modal> */}
    <div className={styles.labelMainContainer}>
      <Menu
        transition
        menuButton={
          <MenuButton className={styles.menuButton}>Label</MenuButton>
        }
        menuClassName={menuClassName}
      >
        <input
          placeholder="search label here"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* 검색기능을 위해 labels 배열을 검색하고 일치하는 라벨만 표시되도록 구현*/}
        {searchLabels().map((item) => (
          <MenuItem
            key={item._id}
            type="checkbox"
            // checked={checker(item)}
            onClick={() => handleAddLabel(item)}
          >
            <div
              className={styles.circle}
              style={{ backgroundColor: item.color }}
            ></div>
            <div>{item.name}</div>
            <div>{checker(item) && <MdCheck />}</div>
          </MenuItem>
        ))}
        <MenuItem onClick={onOpenModal}>Create Labelz</MenuItem>
      </Menu>
      {/* <Modal open={open} onClose={onCloseModal} center  classNames={{
          overlay: styles.customOverlay,
          modal:styles.customModal,
        }}>
        <h2>Simple centered modal</h2>
        <HexColorPicker color={color} onChange={setColor} />
        <input
          placeholder="이름을 입력하세요"
          value={labelName}
          onChange={handelLabelNameChange}
        />
        <button onClick={createLabel}>입력</button>
      </Modal> */}
    </div>
    {/* <div className={styles.labelListContainer}> 
        {todoForm.label.length > 0 &&
          todoForm.label.map((item) => (
            <div className={styles.displyedLabel}>
              <div
              className={styles.circle}
              style={{ backgroundColor: item.labelColor }}
            ></div>
              {item.labelName}
              <button className={styles.displyedLabelbutton} onClick={() => handleAddLabel(item)}><MdOutlineClose /> </button>
            </div>
          ))}
      </div> */}
    </>
  );
}

export default LabelDropdown;
