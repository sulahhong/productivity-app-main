import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../context";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from "uuid";
import styles from "./LabelDropdown.module.css";

function LabelDropdown() {
  const { labels, setLabels } = useGlobalContext();

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [labelName, setLabelName] = useState("")

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const createLabel = () => {
    
 const label ={
    labelId: uuidv4() , 
    labelName: labelName,
    labelColor: color,
 }

    setLabels([...labels, label])
  }

  const handelLabelNameChange = (e) => {
    setLabelName(e.target.value)
  }

  return (
    <div>
      <Menu menuButton={<MenuButton>Label</MenuButton>} className={styles.optionContainer}>
        {labels.map((item) => <MenuItem className={styles.labelItem} ><div className={styles.circle} style={{backgroundColor: item.labelColor}}></div><div>{ item.labelName}</div></MenuItem>)}
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
