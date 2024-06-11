import React, { useState, useContext, useEffect } from "react";
import styles from "../page/MyTodoPage.module.css";
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import NewTodoModal from "../modal/NewTodoModal";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  SubMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdCalendarToday,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineToday,
  MdOutlineInfo,
  MdMoreHoriz,
  MdFilterList,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdBlockFlipped,
  MdErrorOutline,
  MdDragIndicator,
} from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegListAlt,
  FaUserCircle,
  FaRegStar,
  FaRegEdit,
  FaSearch,
} from "react-icons/fa";

import { FaSignal } from "react-icons/fa";
import { CgSignal } from "react-icons/cg";

import toast, { Toaster } from "react-hot-toast";
import StatusDropdown2 from "../modal/Dropdown/StatusDropdown";
import MySingleTodoItem from "./MySingleTodoItem";

function MyTodoPage() {
  const {
    getTodos,
    todo,
    setOpenTodoModal,
    getLabels,
    getProjectSelf,
    joinProject,
  } = useGlobalContext();

  const { slug, projectId } = useParams();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const projectSeq = async () => {
      const projectMemberResponse = await getProjectSelf(slug, projectId);
      if (projectMemberResponse.data[0] && projectMemberResponse.data[0]._id) {
        getTodos(slug, projectId);
        getLabels(slug, projectId);
      } else {
        joinProject(slug, projectId);
      }
    };

    projectSeq();
  }, []);

  const handleGoBack = () => {
    navigate(`/${slug}/project`);
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.topBarGuideMain}>
          <div className={styles.topBarGuideItem}>
            <button
              className={styles.guideButton}
              onClick={() => handleGoBack()}
            >
              <MdKeyboardArrowLeft />
            </button>
            <h1>My TodoList</h1>
          </div>
          <div className={styles.topBarGuideAside}>
            <div className={styles.topBarGuideFilter}>
              <button className={styles.guideButton}>
                <MdFilterList />
              </button>
            </div>
            <div className={styles.topBarGuideAdd}>
              <button
                className={styles.addButton}
                onClick={() => setOpenTodoModal(true)}
              >
                <MdAdd className={styles.todoAddIcon} />
                Add
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainBoard}>
        <div className={styles.mainBoardGridContainer}>
		{todo?.length > 0
			? todo.map((item) => (
         <MySingleTodoItem key={item._id} slug={slug} projectId={projectId} item={item} />
      )): null}
        </div>
        </div>
      </main>
    </div>
    </div>
  );
}

export default MyTodoPage;
