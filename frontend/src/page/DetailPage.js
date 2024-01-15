import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoSinglePage.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  MdOutlineClose,
  MdKeyboardArrowLeft,
  MdVerticalSplit,
} from "react-icons/md";
import Comments from "../components/Comments";
import SideOptionModal from "../components/SideOptionModal";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Line, Circle } from "rc-progress";
import StatusDropdown2 from "../modal/Dropdown/StatusDropdown";
import PriorityDropdown from "../modal/Dropdown/PriorityDropdown";
import DuedateDropdown from "../modal/Dropdown/DuedateDropdown";
import LabelDropdown from "../modal/Dropdown/LabelDropdown";
import TodoHistory from "./TodoHistory";
import CommentPage from "./CommentPage";
import AssigneeDropdown from "../modal/Dropdown/AssigneeDropdown";
import ParentDropdown from "../modal/Dropdown/ParentDropdown";

function DetailPage() {
  const {
    openSideModal,
    setOpenSideModal,
    labels,
    setLabels,
    getTodoById,
    status: statusOpt,
    priority: priorityOpt,
    updateTodo,
    getTodoHistory,
    addTodoAttachment,
    getTodoAttachment,
  } = useGlobalContext();

  const { slug, projectId, todoId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
    priority: priorityOpt[0],
    status: statusOpt[0],
    dueDate: "",
    parent: null,
    label: [],
    assignee: [],
  });

  const { title, description, priority, status, dueDate, label } = todoForm;

  const [todoHistory, setTodoHistory] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [todoAttachments, setTodoAttachments] = useState([])

  async function fetchData() {
    const data = await getTodoById(slug, projectId, todoId);
    console.log("DATA CHECK", data);
    setTodoForm(data.data);
    const attachment = await getTodoAttachment(slug, projectId, todoId);
    console.log("ATTACHMENT DATA " , attachment)
    setTodoAttachments(attachment.data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchDataTodoHist() {
    const data = await getTodoHistory(slug, projectId, todoId);
    setTodoHistory(data);
  }

  //   useEffect(() => {
  //     // handleBlur()
  //    if(todoForm._id ){
  //     console.log("GG")
  //     updateTodo(slug, projectId, todoId, todoForm)
  //    }
  //   }, [todoForm])

  //   const handleUpdateTodoAPI = async () => {
  //    await updateTodo(slug, projectId, todoId, todoForm)
  //     await fetchData()
  //   };

  const handleUpdateTodoAPI = async (todo) => {
    await updateTodo(slug, projectId, todoId, todo);
    await fetchData();
    await fetchDataTodoHist();
  };

  const handleTodoChange = (e) => {
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
    if (todoForm._id) {
      handleUpdateTodoAPI(updatedTodo);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setSelectedAttachment(file)
  }

  const handleAttachmentUpload = () => {
    return addTodoAttachment(slug, projectId, todoId, selectedAttachment)
  }

  useEffect(() => {
    const uploadAndGet = async () => {
      const uploadSuccess = await handleAttachmentUpload();
      if (uploadSuccess) {
        await getTodoAttachment(slug, projectId, todoId);
      }
    }

    if (selectedAttachment != null) {
      uploadAndGet();
    }

    console.log("ATTACHMENT")
  },[selectedAttachment])
  

  return (
    <div className={styles.singlePageContainer}>
      <div className={styles.singlePageBody}>
        <div className={styles.singlePageBodyTitle}>
          <div className={styles.singlePageBodyTitle2}>
            <button
              className={styles.singlePageBackButton}
              onClick={() => navigate(-1)}
            >
              <MdKeyboardArrowLeft />
            </button>
            <div className={styles.singlePageTitleName}>
              <span>{title} </span>
              {projectId && (
                <div className={styles.singlepageGuideBar}>
                  {/* | Issue {projectTitle} Details */}
                  {/* 프로젝트 이름으로 변경할 예정  */}
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              className={styles.singlePageBackButton}
              onClick={() => setOpenSideModal(!openSideModal)}
            >
              <MdVerticalSplit />{" "}
            </button>

            {/* {openSideModal && (
              <SideOptionModal
                id={id}
                todoForm={todoForm}
                setTodoForm={setTodoForm}
              />
            )} */}
          </div>
        </div>

        <div className={styles.singlePageMain}>
          <div className={styles.singlePageInput}>
            <input
              className={styles.singlePageInputTitle}
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onBlur={() => handleUpdateTodoAPI(todoForm)}
              onChange={handleTodoChange}
              //   onKeyDown={(e) => handleTodoTitleEnter(e)}
            />
          </div>
          <div className={styles.singlePageTextBox}>
            <textarea
              className={styles.singlePageDesInput}
              placeholder="Description"
              name="description"
              value={description}
              onBlur={() => handleUpdateTodoAPI(todoForm)}
              onChange={handleTodoChange}
            />
          </div>
          <div className={styles.optionContainer}>
            <StatusDropdown2
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action={handleUpdateTodoAPI}
            />

            <PriorityDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action={handleUpdateTodoAPI}
            />

            <DuedateDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action={handleUpdateTodoAPI}
            />

            <LabelDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action={handleUpdateTodoAPI}
              slug={slug}
              projectId={projectId}
            />

            <AssigneeDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action={handleUpdateTodoAPI}
              slug={slug}
              projectId={projectId}
            />

            <ParentDropdown
               todoForm={todoForm}
               setTodoForm={setTodoForm}
               todoId={todoId}
               action={handleUpdateTodoAPI}
               slug={slug}
               projectId={projectId}
            />

          </div>
          
          <div className={styles.labelListContainer}>
            {todoForm.label.length > 0 &&
              todoForm.label.map((item) => (
                <div className={styles.displyedLabel}>
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.name}
                  <button
                    className={styles.displyedLabelbutton}
                    onClick={() => handleAddLabel(item)}
                  >
                    <MdOutlineClose />{" "}
                  </button>
                </div>
              ))}
          </div>
        </div>

          <div className={styles.subTodoContainer}>
            <h1>Sub Todo</h1>
            <div className={styles.subTodoInputBox}>
              <input className={styles.subTodoInput} placeholder="add new sub Todo.." />
              <button>입력</button>
            </div>
          </div>

        <div className={styles.attachmentContainer}>
          <div className={styles.attachmentInputWrapper}>
            <h1>Attachments</h1>
            <div
              className={styles.attachmentInputBox}
              onClick={handleIconClick}
            >
              <h1>click to add</h1>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleAttachmentChange}
              />
            </div>
          </div>
          {todoAttachments?.map((item) => (
              <div>{item.fileName}</div>
          ))}
        </div>

      </div>
      <TodoHistory
        slug={slug}
        projectId={projectId}
        todoId={todoId}
        fetchDataTodoHist={fetchDataTodoHist}
        todoHistory={todoHistory}

      />
      <CommentPage
        slug={slug}
        projectId={projectId}
        todoId={todoId}
        fetchDataTodoHist={fetchDataTodoHist}
      />
    </div>
  );
}

export default DetailPage;
