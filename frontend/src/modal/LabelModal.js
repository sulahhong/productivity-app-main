import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-responsive-modal";
import { useGlobalContext } from "../context";
import styles from "./NewTodoModal.module.css";
import { HexColorPicker } from "react-colorful";
import {
    MdOutlineClose,

  } from "react-icons/md";
import { useParams } from "react-router-dom";

function LabelModal() {
  const {
    labels,
    setLabels,
    todos,
    setTodos,
    openLabelModal,
    setOpenLabelModal,
    createLabel,
    getLabels,
  } = useGlobalContext();

  const path = window.location.pathname;
  const pathSegments = path.split('/');

  const slug = pathSegments[1];
  const projectId = pathSegments[3];


  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("GET SLUG & PROJID ", slug, projectId)
  }, [])


  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpenLabelModal(false);

  const handelLabelNameChange = (e) => {
    setName(e.target.value);
  };

  const onCreateLabelButton = async() => {
    let labelForm = {
        name: name,
        color: color
    }
    // createLabel()
    const success = await createLabel(labelForm, slug, projectId )

    if (success) {
        await setOpenLabelModal(false)
    }
  };

  return (
    // <Modal
    //   open={openLabelModal}
    //   onClose={onCloseModal}
    //   center
    //   classNames={{
    //     overlay: styles.customOverlay,
    //     modal: styles.customModal,
    //   }}
    // >
    //   <h2>Simple centered modal</h2>
    //   <HexColorPicker color={color} onChange={setColor} />
    //   <input
    //     placeholder="이름을 입력하세요"
    //     value={labelName}
    //     onChange={handelLabelNameChange}
    //   />
    //   <button onClick={createLabel}>입력</button>
    // </Modal>
    <div  className={styles.todoModalOverlay}>
        <div className={styles.todoModalContainer}>
        <div className={styles.todoModalHeader}>
        <div className={styles.todoModalHeaderTitle}>New Task</div>
          <button className={styles.todoModalCloseButton}
            onClick={onCloseModal}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className={styles.todoModalBody}>
        <HexColorPicker color={color} onChange={setColor} />
         <input
            placeholder="이름을 입력하세요"
            value={name}
            onChange={handelLabelNameChange}
            />
         <button onClick={onCreateLabelButton}>입력</button>
        </div>
        </div>
    </div>
  );
}

export default LabelModal;
