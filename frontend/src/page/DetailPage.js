import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoSinglePage.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  MdOutlineClose,
  MdKeyboardArrowLeft,
  MdVerticalSplit,
  MdMoreHoriz,
  MdAdd,
} from "react-icons/md";
import Comments from "../components/Comments";
import SideOptionModal from "../components/SideOptionModal";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Line, Circle } from "rc-progress";
import StatusDropdown2 from "../modal/Dropdown/StatusDropdown";
import DuedateDropdown from "../modal/Dropdown/DuedateDropdown";
import LabelDropdown from "../modal/Dropdown/LabelDropdown";
import TodoHistory from "./TodoHistory";
import CommentPage from "./CommentPage";
import AssigneeDropdown from "../modal/Dropdown/AssigneeDropdown";
import ParentDropdown from "../modal/Dropdown/ParentDropdown";
import { useForm } from "react-hook-form";
import PriorityDropdown2 from "../modal/Dropdown/PriorityDropdown2";

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
    deleteTodoAttachments,
    getSubTodos,
    createTodo,
  } = useGlobalContext();

  const { slug, projectId, todoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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

  const {
    register: registerSubTodo,
    handleSubmit: handleSubmitSubTodo,
    reset: resetSubTodo,
    formState: { errors: subTodoErrors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { title, description } = todoForm;

  const [todoHistory, setTodoHistory] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [todoAttachments, setTodoAttachments] = useState([]);
  const [subIssuesOn, setSubIssuesOn] = useState(false);
  const [subIssues, setSubIssues] = useState([]);

  async function fetchData() {
    const data = await getTodoById(slug, projectId, todoId);
    console.log("DATA CHECK", data);
    setTodoForm(data.data);
    const attachment = await getTodoAttachment(slug, projectId, todoId);
    console.log("ATTACHMENT DATA ", attachment);
    setTodoAttachments(attachment.data);
    const subIssue = await getSubTodos(slug, projectId, todoId);
    console.log("SUBTODO ", subIssue);
    setSubIssues(subIssue.data);
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

  const handleClickToAddAttachment = () => {
    fileInputRef.current.click();
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setSelectedAttachment(file);
  };

  const handleAttachmentUpload = () => {
    return addTodoAttachment(slug, projectId, todoId, selectedAttachment);
  };

  useEffect(() => {
    const uploadAndGet = async () => {
      const uploadSuccess = await handleAttachmentUpload();
      if (uploadSuccess) {
        const data = await getTodoAttachment(slug, projectId, todoId);
        setTodoAttachments(data);
      }
    };

    if (selectedAttachment != null) {
      uploadAndGet();
    }

    console.log("ATTACHMENT");
  }, [selectedAttachment]);

  const handleTodoAttachmentDelete = async (attachmentId) => {
    await deleteTodoAttachments(slug, projectId, todoId, attachmentId);
    await fetchData();
  };

  const goToFileImageUrl = (item) => {
    console.log("attachment url", item);
    window.open(item.fileUrl, "_blank");

    // window.open을 사용하여 새 창을 열고 이미지 URL을 표시
    // window.open(item.fileUrl, '_blank');

    // 또는 현재 창에서 열고 싶으면 아래 코드 사용
    // window.location.href = item.fileUrl;
  };

  const handleSubTodoSubmit = async (data) => {
    const newTodo = {
      ...data,
      parent: todoId,
      priority: priorityOpt[0],
      status: statusOpt[0],
    };
    const success = await createTodo(newTodo, slug, projectId);
    if (success) {
      resetSubTodo();
      setSubIssuesOn(false);
      fetchData();
    }
  };

  const handleSubTodoClick = (subTodoId) => {
    navigate(`/${slug}/project/${projectId}/todo/${subTodoId}`);
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
    <div className={styles.singlePageContainer}>
      <div className={styles.singlePageBody}>
        <div className={styles.singlePageBodyTitle}>
          <div className={styles.singlePageBodyTitle2}>
            <button
              className={styles.singlePageBackButton}
              onClick={() => navigate(`/${slug}/project/${projectId}`)}
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
              todo={todoForm}
              onUpdate={handleUpdateTodoAPI}
            />

            {/* <PriorityDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action={handleUpdateTodoAPI}
            /> */}

            <PriorityDropdown2
              todo={todoForm}
              onUpdate ={handleUpdateTodoAPI}
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
              action={handleUpdateTodoAPI}
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
          <div className={styles.subTodoTitleButton}>
            {subIssues.length > 0 ? (
              <div className={`${styles.subTodoTitleButton} ${styles.noList}`}>
                <div>
                  <h1> Sub-Issues</h1>
                </div>
                <div className={styles.subTodoTitleButtonBox}>
                  <button
                    type="button"
                    onClick={() => setSubIssuesOn(true)}
                    className={`${styles.subTodoTitleButton} ${styles.list}`}
                  >
                    <MdAdd />
                  </button>
                  <button
                    type="button"
                    className={`${styles.subTodoTitleButton} ${styles.list}`}
                  >
                    <MdMoreHoriz />
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${styles.subTodoTitleButton} ${styles.noList}`}>
                <div>
                  <h1 onClick={() => setSubIssuesOn(true)}>
                    {" "}
                    + Add Sub-Issues
                  </h1>
                </div>
              </div>
            )}
          </div>
          <div>
            {subIssues.length > 0 &&
              subIssues.map((item) => (
                <div className={styles.subTodoListContainer}>
                  <div
                    className={styles.subTodoTitle}
                    onClick={() => handleSubTodoClick(item._id)}
                  >
                    <div>
                      {item.project.description}-{item.sid}
                    </div>
                    <div>{item.title}</div>
                    <div></div>
                  </div>
                  <div className={styles.subTodoTitle}>
                    <div>Priority</div>
                    <div>Asignee</div>
                  </div>
                </div>
              ))}
            {subIssuesOn && (
              <form onSubmit={handleSubmitSubTodo(handleSubTodoSubmit)}>
                <div className={styles.subTodoForm}>
                  <div className={styles.subTodoInputBox}>
                    <div className={styles.subTodoInputItem}>
                      <input
                        className={styles.subTodoInput}
                        type="text"
                        placeholder="Issue title"
                        id="title"
                        {...registerSubTodo("title", {
                          required: "제목은 필수 입력 값입니다",
                          minLength: 2,
                        })}
                      />
                    </div>
                    {/* 에러처리 이곳에 */}
                  </div>
                  <div className={styles.subTodoInputBox}>
                    <div className={styles.subTodoInputItem}>
                      <input
                        className={styles.subTodoInput}
                        type="text"
                        placeholder="Add description"
                        id="description"
                        {...registerSubTodo("description", {
                          required: "내용은 필수 입력 값입니다",
                          minLength: 2,
                        })}
                      />
                    </div>
                  </div>
                  <div></div>
                  <div className={styles.subTodoButtonBox}>
                    <button
                      className={styles.subTodoButton}
                      type="button"
                      onClick={() => setSubIssuesOn(false)}
                    >
                      Cancel
                    </button>
                    <button className={styles.subTodoButton} type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className={styles.attachmentContainer}>
          <div className={styles.attachmentInputWrapper}>
            <h1 className={styles.attachmentTitle}>Attachments</h1>
            <div
              className={styles.attachmentInputBox}
              onClick={handleClickToAddAttachment}
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
            <div className={styles.attachmentInputBoxItem}>
              <div
                className={styles.attachmentInputBoxInner}
                onClick={() => goToFileImageUrl(item)}
              >
                <div></div>
                <div>{item.fileName}</div>
                <div>{}</div>
              </div>
              <div
                className={styles.deleteButton}
                onClick={() => handleTodoAttachmentDelete(item._id)}
              >
                <button type="button">X</button>
              </div>
            </div>
          ))}
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
    <div className={styles.container2}>
      <div className={styles.inner}>
aaa
      </div>
    </div>
    </div>
    </div>
  );
}

export default DetailPage;
