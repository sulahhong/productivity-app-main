import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  MdOutlineClose,
  MdCalendarToday,
  MdOutlinedFlag,
  MdSort,
  MdGridView,
} from "react-icons/md";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./TodoModal.module.css";
import Comments from "./Comments";
import { MdKeyboardArrowDown, MdAdd } from "react-icons/md";

function TodoModal() {
  const {
    todos,
    setTodos,
    openModal,
    setOpenModal,
    targetTodoGlobal,
    setTargetTodoGlobal,
    setIsEditingTodo,
    isEditingTodo,
    projects,
    viewCategory,
    setViewCategory,
    comments,
    setComments,
    reply,
    setReply,
    user, 
    setUser,
    targetCommentGlobal,
    setTaegetCommentGlobal,
    isEditingComment,
    setIsEditingComment,
  } = useGlobalContext();
  const [todoForm, setTodoForm] = useState({
    todoId: "",
    todoTitle: "",
    todoDescription: "",
    todoDone: false,
    todoPriority: "1",
    todoCreateDate: "",
    todoDueDate: "",
    projectId: projects.length > 0 ? projects[0].projectId : "",
    projectTitle: projects.length > 0 ? projects[0].projectTitle : "",
  });
  const {
    todoId,
    todoTitle,
    todoDescription,
    todoDone,
    todoPriority,
    todoCreateDate,
    todoDueDate,
    projectId,
    projectTitle,
  } = todoForm;

  const [commentsForm, setCommentsForm] = useState({
    commentId: "",
    commentText: "",
    commentAuthor: user,
    commentCreateTime: "",
    commentUpdateTime: "",
    commentIsReply: false,
    postId: "",
  });
  const {
    commentId,
    commentText,
    commentAuthor,
    commentCreateTime,
    commentUpdateTime,
    commentIsReply,
    postId,
  } = commentsForm;

  useEffect(() => {
    if (isEditingTodo) {
      setTodoForm(targetTodoGlobal); // setTodoForm에 저장된 내용을 수정 할때 가지고올 수 있도록
    }
    console.log("jenggo", isEditingTodo);
  }, []);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const handleAddNewTodo = () => {
    setOpenModal(!openModal);
  };

  const handleTodoChange = (e) => {
    // console.log("name", e.target.name);

    // console.log("value", e.target.value);
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      // projectId: item.projectID
    }));
  };

  useEffect(() => {
    // const proj= projects.filter((item)=> item.projectId == projectId)//""
    // console.log("PROJ", proj)
    // const projectTitle = proj[0].projectTitle
    // console.log("PROJ2", projectTitle )

    // setTodoForm((prevState) => ({
    //   ...prevState,
    //   projectTitle : projectTitle,
    // }))

    console.log("PROJ ID:", projectId);

    if (projectId) {
      const proj = projects.filter((item) => item.projectId == projectId); //""
      console.log("PROJ", proj);
      const projectTitle = proj[0].projectTitle;
      console.log("PROJ2", projectTitle);

      setTodoForm((prevState) => ({
        ...prevState,
        projectTitle: projectTitle,
      }));
    }
  }, [projectId]);

  const handleCreateTodo = () => {
    const todoCreateDate = new Date().toISOString().slice(0, 10);
    console.log(todoCreateDate);
    const todoId = uuidv4();
    console.log(todoId);
    console.log("todoform", todoForm);
    setTodoForm((prevState) => ({
      ...prevState,
      todoCreateDate,
      todoId,
    }));
    setViewCategory("all");
  };

  const handleEditTodoModal = () => {
    const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    console.log("index", todoEditIndex);

    const testArray = [...todos];
    console.log("test", testArray);
    testArray.splice(todoEditIndex, 1, {
      todoId: todoId,
      todoTitle: todoTitle,
      todoDescription: todoDescription,
      todoDone: todoDone,
      todoPriority: todoPriority,
      todoCreateDate: todoCreateDate,
      todoDueDate: todoDueDate,
    });
    console.log("test2", testArray);

    setTodos(testArray);
    setOpenModal(false);
    // setTodoForm({
    //   todoId: "",
    //   todoTitle: "",
    //   todoDescription: "",
    //   todoDone: false,
    //   todoPriority: "1",
    //   todoCreateDate: "",
    //   todoDueDate: "",
    // })
    setTargetTodoGlobal({});
    setIsEditingTodo(false);
  };

  const createNewTodo = () => {
    console.log("gg", todoForm);

    setTodos([todoForm, ...todos]);
    setOpenModal(false);
  };

  useEffect(() => {
    if (!isEditingTodo) {
      if (todoCreateDate && todoId) {
        console.log("xxx", todoForm);
        createNewTodo();
      }
      console.log("i run");
    }
  }, [todoCreateDate, todoId]);

  const closeModal = () => {
    setOpenModal(false);
    setTargetTodoGlobal({});
    setIsEditingTodo(false);
  };

  const handleOverlayClose = (e) => {
    if (e.target.id == "overlay") {
      setOpenModal(false);
    }
  };

  const handleCommentChange = (e) => {
    setCommentsForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const hanldeCreateComment = () => {
    if(todoId) {
    const commentCreateTime = new Date();
    const commentId = uuidv4();
    const postId = todoId;
   
    console.log("ABC", commentCreateTime, commentId, postId, todoId)

    setCommentsForm((prevState) => ({
      ...prevState,
      commentCreateTime,
      commentId,
      postId,
    }))
    console.log("commentsForm", commentsForm)


   
  }else{
    console.log("cannot create comment")
  }
    console.log("todoidcheck", todoId)
  }

  useEffect(()=>{

    if(commentCreateTime &&
      commentId && postId) {
      console.log("useeffect check")

      setComments([ ...comments, commentsForm])
      setCommentsForm({
        commentId: "",
        commentText: "",
        commentAuthor: user,
        commentCreateTime: "",
        commentUpdateTime: "",
        commentIsReply: false,
        postId: "",
      })
    }

    
  }, [commentsForm])

  return (
    <div
      className={styles.todoModalOverlay}
      onClick={(e) => handleOverlayClose(e)}
      id="overlay"
    >
      <div className={styles.todoModalContainer}>
        <div className={styles.todoModalHeader}>
          <div className={styles.todoModalHeaderTitle}>New Task</div>
          <button className={styles.todoModalCloseButton} onClick={closeModal}>
            <MdOutlineClose />
          </button>
        </div>
        <div className={styles.todoModalBody}>
          <div className={styles.todoModalInput}>
            <input
              className={styles.todoModalInputTitle}
              name="todoTitle"
              placeholder="Title"
              value={todoTitle}
              onChange={handleTodoChange}
            />
            <div className={styles.todoDesWrap}>
              <div className={styles.todoModalSettingIcon2}>
                <MdSort size={20} />{" "}
              </div>
              <input
                className={styles.todoModalInputDescription}
                placeholder="Description"
                name="todoDescription"
                value={todoDescription}
                onChange={handleTodoChange}
              />
            </div>
            <div className={styles.todoSubTask}>
              <button className={styles.todoSubTaskBtn}>
                {" "}
                <MdAdd /> Sub Task{" "}
              </button>
            </div>
          </div>
          <div className={styles.todoModalSelector}>
            <div className={styles.todoModalSettings}>
              <div className={styles.todoModalSetting}>
                <div className={styles.todoModalSettingIcon}>
                  <MdOutlinedFlag size={20} />{" "}
                </div>
                <div className={styles.todoModalSettingText}>Priority</div>
                <select
                  className={styles.todoModalSettingOption}
                  name="todoPriority"
                  value={todoPriority}
                  onChange={handleTodoChange}
                >
                  <option value="1">priority 1</option>
                  <option value="2">priority 2</option>
                  <option value="3">priority 3</option>
                  <option value="4">priority 4</option>
                </select>
              </div>
            </div>
            <div className={styles.todoModalSetting}>
              <div className={styles.todoModalDueDate}>
                <div className={styles.todoModalSettingIcon}>
                  <MdCalendarToday size={20} />{" "}
                </div>
                <div className={styles.todoModalDueDateTitle}>Duedate</div>
                <input
                  className="todoDueDateInput"
                  type="date"
                  value={todoDueDate}
                  name="todoDueDate"
                  onChange={handleTodoChange}
                />
              </div>
            </div>
            <div className={styles.todoModalSelectProject}>
              <div className={styles.todoModalSettingIcon}>
                <MdGridView size={20} />{" "}
              </div>
              <div className={styles.todoModalSelectProjectTitle}>Project</div>
              <select
                className={styles.todoModalSelectProjectTitleOption}
                name="projectId"
                value={projectId}
                onChange={handleTodoChange}
              >
                {projects.length > 0 &&
                  projects.map((option) => (
                    <option key={option.projectId} value={option.projectId}>
                      {option.projectTitle}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.todoModalComments}>
          <div className={styles.todoModalCommentsTitle}>
            <MdKeyboardArrowDown /> Comments
          </div>
          
          <div className={styles.todoModalCommentsInput}>
            <input
              name="commentText"
              value={commentText}
              placeholder="댓글을 입력해주세요 :)"
              onChange={handleCommentChange}
            />
            <button onClick={hanldeCreateComment}>입력</button>
          </div>
            
          {comments && comments.filter(item => item.postId == todoId).map((item) => <Comments item={item} commentsForm={commentsForm} setCommentsForm={setCommentsForm} />)}
        </div>
        <div className={styles.todoModalAddTodocontainer}>
          {isEditingTodo ? (
            <button
              className={styles.todoModalAddTodo}
              onClick={() => handleEditTodoModal()}
            >
              Edit
            </button>
          ) : (
            <button
              className={styles.todoModalAddTodo}
              onClick={() => handleCreateTodo()}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
