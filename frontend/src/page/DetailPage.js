import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoSinglePage.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  MdOutlineClose,
  MdCalendarToday,
  MdOutlinedFlag,
  MdSort,
  MdGridView,
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdDelete,
  MdModeEdit,
  MdAdd,
  MdKeyboardArrowDown,
  MdCheck,
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


function DetailPage() {
    const {
        todos,
        setTodos,
        projects,
        comments,
        setComments,
        subtask,
        setSubtask,
        user,
        setUser,
        priorityDropdown,
        setPriorityDropdown,
        dueDateDropdown,
        setDueDateDropdown,
        projectDropdown,
        setProjectDropdown,
        setPriority,
        openSideModal,
        setOpenSideModal,
        labels,
        setLabels,
        getTodoById,
        status: statusOpt,
        priority: priorityOpt,
        updateTodo,
      } = useGlobalContext();

      const { slug, projectId, todoId } = useParams();
      const navigate = useNavigate();

      const [todoForm, setTodoForm] = useState({
        title: "",
        description: "",
        priority: priorityOpt[0],
        status: statusOpt[0],
        dueDate: "",
        label: [],
      });
    
      const { title, description, priority, status, dueDate, label } = todoForm;

      async function fetchData() {
        
        const data = await getTodoById(slug, projectId, todoId)
        console.log("DATA CHECK", data )
        setTodoForm(data)
       }

      useEffect(() =>{
    
       fetchData()
      }, [])
      
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
        await updateTodo(slug, projectId, todoId, todo)
         await fetchData()
       };

      const handleTodoChange = (e) => {
        setTodoForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
      }

      
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
  };

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
              onBlur={()=>handleUpdateTodoAPI(todoForm)}
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
              onBlur={()=>handleUpdateTodoAPI(todoForm)}
              onChange={handleTodoChange}
            />
          </div>
          <div className={styles.optionContainer}>
            <StatusDropdown2
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action = {handleUpdateTodoAPI}
            />

            <PriorityDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action = {handleUpdateTodoAPI}
            />

            <DuedateDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action = {handleUpdateTodoAPI}
            />

            <LabelDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
              action = {handleUpdateTodoAPI}
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
      </div>
      {/* <div className={styles.subtaskMainContainer}>
        <div className={styles.todoSubtask}>
          {subtask.filter((item) => item.subtaskPostId == todoId).length >
            0 && (
            <div className={styles.subtaskLineProgressbar}>
              <span>
                {completedSubtask}/{totalSubtask}
              </span>
              <Line percent={(completedSubtask/totalSubtask)*100} strokeWidth={10} trailWidth={10} />
            </div>
          )}
          {onSubtask ? (
            <div className={styles.subtaskInputContainer} ref={subtaskRef}>
              <input
                className={styles.subtaskInputBox}
                placeholder="Add New Sub-task..."
                value={subtaskText}
                onChange={handleSubtaskChange}
              />
              <div className={styles.subtaskInputButtonBox}>
                <button
                  className={styles.subtaskCancelButton}
                  onClick={() => setOnSubtask(false)}
                >
                  취소
                </button>
                <button
                  className={styles.subtaskSaveButton}
                  onClick={handleCreateSubtask}
                >
                  입력
                </button>
              </div>
            </div>
          ) : (
            <div
              className={styles.todoSubtaskBtn}
              onClick={() => setOnSubtask(true)}
            >
              <div className={styles.subtaskTitle}>
                <MdAdd /> Sub task
              </div>
              {
                // <div className={styles.SubtaskProgressbar}>
                //   <CircularProgressbar
                //     value={completedSubtask}
                //     maxValue={totalSubtask}
                //     text={`${completedSubtask}/${totalSubtask}`}
                //   />
                // </div>
              }
            </div>
          )}
        </div>
        <div className={styles.singlePageSubtaskList}>
          {subtask &&
            subtask
              .filter((item) => item.subtaskPostId == todoId)
              .map((item) => (
                <div className={styles.todoSubtaskListContainer}>
                  <div className={styles.todoSubtaskCheckBox}>
                    {item.subtaskDone ? (
                      <div
                        className={styles.todoSubtaskCheckBox}
                        onClick={() => handleSubtaskDone(item.subtaskId)}
                      >
                        <MdOutlineCheckCircleOutline id="subtaskDone" />
                      </div>
                    ) : (
                      <div
                        className={styles.todoSubtaskCheckBox}
                        onClick={() => handleSubtaskDone(item.subtaskId)}
                      >
                        <MdRadioButtonUnchecked id="subtaskNotDone" />
                      </div>
                    )}
                    {item.subtaskId == editingSubtaskId ? (
                      <div className={styles.todoSubtaskEditMode}>
                        <input
                          className={styles.subtaskEditMode}
                          value={editSubtaskValue}
                          onChange={(e) => setEditSubtaskValue(e.target.value)}
                        />
                        <div className={styles.subtaskEditModeButtonBox}>
                          <button
                            className={styles.subtaskSaveButton}
                            onClick={() => handleSubtaskEditing(item)}
                          >
                            수정
                          </button>
                          <button
                            className={styles.subtaskCancelButton}
                            onClick={() => handleEditSubTaskToggle(item)}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          item.subtaskDone
                            ? styles.todoSubtaskDone
                            : styles.todoSubtask
                        }
                      >
                        {item.subtaskText}
                      </div>
                    )}
                  </div>
                  <div className={styles.todoSubtaskIconGroup}>
                    <div
                      className={styles.todoSubtaskIcon}
                      onClick={() => handleEditSubTaskToggle(item)}
                    >
                      <MdModeEdit />
                    </div>
                    <div
                      className={styles.todoSubtaskIcon}
                      onClick={() => handleSubtaskDelete(item.subtaskId)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div> */}

      {/* <div className={styles.singleComments}>
        <div className={styles.comments}>
          <div className={styles.commentsTitle}>
            <MdKeyboardArrowDown className={styles.commentsIcon} /> Comments
          </div>

          <div className={styles.commentsInputContainer}>
            <div className={styles.commentsInputBox}>
              <input
                className={styles.commentsInput}
                name="commentText"
                value={commentText}
                placeholder={commentIsFocused ? "" : "댓글을 입력해주세요 :)"}
                onFocus={() => setCommentIsFocused(true)}
                onBlur={() => setCommentIsFocused(false)}
                onChange={handleCommentChange}
              />
            </div>
            <div className={styles.commentsInputButtonBox}>
              <button
                className={styles.commentsInputButton}
                onClick={handleCreateComment}
              >
                입력
              </button>
            </div>
          </div>

          {comments &&
            comments
              .filter((item) => item.postId == todoId)
              .map((item) => <Comments item={item} />)}
        </div>
      </div> */}
    </div>
  );
}

export default DetailPage