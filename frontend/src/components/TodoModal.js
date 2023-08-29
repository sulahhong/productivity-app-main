import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  MdCheck,
} from "react-icons/md";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { getStringDate } from "../utill/date";
import styles from "./TodoModal.module.css";
import Comments from "./Comments";
import { MdKeyboardArrowDown, MdAdd } from "react-icons/md";
import PriorityDropdown from "./PriorityDropdown";
import DuedateDropdown from "./DuedateDropdown";
import ProjectDropdown from "./ProjectDropdown";
import LabelDropdown from "./LabelDropdown";

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
    subtask,
    setSubtask,
    priority,
    setPriority,
    priorityDropdown,
    setPriorityDropdown,
    dueDateDropdown,
    setDueDateDropdown,
    projectDropdown,
    setProjectDropdown,
  } = useGlobalContext();
  const [todoForm, setTodoForm] = useState({
    todoId: "",
    todoTitle: "",
    todoDescription: "",
    todoDone: false,
    todoCreateDate: "",
    todoDueDate: "",
    projectId: projects.length > 0 ? projects[0].projectId : "",
    projectTitle: projects.length > 0 ? projects[0].projectTitle : "",
    priorityId: "",
    priorityTitle: "",
    label: [],
  });
  const {
    todoId,
    todoTitle,
    todoDescription,
    todoDone,
    todoCreateDate,
    todoDueDate,
    projectId,
    projectTitle,
    priorityId,
    priorityTitle,
    label,
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

  const [subtaskForm, setSubtaskForm] = useState({
    subtaskId: "",
    subtaskText: "",
    subtaskDone: false,
    subtaskCreateDate: "",
    subtaskPostId: "",
  });

  const {
    subtaskId,
    subtaskText,
    subtaskDone,
    subtaskCreateDate,
    subtaskPostId,
  } = subtaskForm;

  const [commentInputValue, setCommentInputValue] = useState("");
  const [onSubtask, setOnSubtask] = useState(false);
  const [isEditingSubtask, setIsEditingSubtask] = useState(false);
  const [editingSubtaskId, setEditingSubtaskId] = useState("");
  const [editSubtaskValue, setEditSubtaskValue] = useState(""); // 저장된 subtaskText 값을 수정할 때 change되는 값 저장

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
      todoCreateDate: todoCreateDate,
      todoDueDate: todoDueDate,
      priorityId: priorityId,
      priorityTitle: priorityTitle,
    });
    console.log("test2", testArray);

    setTodos(testArray);
    setOpenModal(false);
    // setTodoForm({
    //   todoId: "",
    //   todoTitle: "",
    //   todoDescription: "",
    //   todoDone: false,
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
    }));
    // setCommentInputValue(e.target.value);
  };

  const handleCreateComment = () => {
    if (todoId) {
      const commentCreateTime = new Date();
      const commentId = uuidv4();
      const postId = todoId;

      console.log("ABC", commentCreateTime, commentId, postId, todoId);

      setCommentsForm((prevState) => ({
        ...prevState,
        commentCreateTime,
        commentId,
        postId,
      }));
      console.log("commentsForm", commentsForm);
    } else {
      console.log("cannot create comment");
    }
    console.log("todoidcheck", todoId);
  };

  useEffect(() => {
    if (commentCreateTime && commentId && postId) {
      console.log("useeffect check");

      setComments([...comments, commentsForm]);
      setCommentsForm({
        commentId: "",
        commentText: "",
        commentAuthor: user,
        commentCreateTime: "",
        commentUpdateTime: "",
        commentIsReply: false,
        postId: "",
      });
    }
  }, [commentsForm]);

  const handleSubtaskChange = (e) => {
    console.log("subsubsubsub", e.target.value);
    setSubtaskForm((prevState) => ({
      ...prevState,
      subtaskText: e.target.value,
    }));
  };

  const handleCreateSubtask = () => {
    if (todoId) {
      const subtaskCreateDate = new Date();
      const subtaskId = uuidv4();
      const subtaskPostId = todoId;

      console.log("SSSSSS", subtaskCreateDate, subtaskId, subtaskPostId);

      setSubtaskForm((prevState) => ({
        ...prevState,
        subtaskCreateDate,
        subtaskId,
        subtaskPostId,
      }));
      console.log("SUBTASKFORM", subtaskForm);
    } else {
      console.log("cannot create subtask");
    }
  };

  useEffect(() => {
    if (subtaskCreateDate && subtaskId && subtaskPostId) {
      setSubtask([...subtask, subtaskForm]);

      setSubtaskForm({
        subtaskId: "",
        subtaskText: "",
        subtaskDone: false,
        subtaskCreateDate: "",
        subtaskPostId: "",
      });
      setOnSubtask(false);
    }
  }, [subtaskForm]);

  const handleSubtaskDone = (id) => {
    console.log("sksksksk", id);

    const arr = subtask.map((item) =>
      item.subtaskId == id ? { ...item, subtaskDone: !item.subtaskDone } : item
    );

    console.log("ARRRR", arr);
    setSubtask(arr);
  };

  const handleSubtaskDelete = (id) => {
    const newSubtaskArr = subtask.filter((item) => item.subtaskId !== id);
    setSubtask(newSubtaskArr);
  };

  const handleEditSubTaskToggle = (item) => {
    setIsEditingSubtask(!isEditingSubtask);

    // setEditingSubtaskId("")
    if (editingSubtaskId == item.subtaskId) {
      setEditingSubtaskId("");
    } else {
      setEditingSubtaskId(item.subtaskId);
      setEditSubtaskValue(item.subtaskText);
    }
  };

  const handleSubtaskEditing = (item) => {
    console.log("iiii", item);
    const subtaskEditIndex = subtask.findIndex(
      (item) => item.subtaskId == editingSubtaskId
    );

    const todoToEdit = subtask.filter(
      (item) => item.subtaskId == editingSubtaskId
    );
    console.log("EDITTT", subtaskEditIndex);

    const testArray = [...subtask];

    let data = {
      ...item,
      subtaskText: editSubtaskValue,
    };

    console.log("DATA", data);

    testArray.splice(subtaskEditIndex, 1, data);
    console.log("FINAL ARR", testArray);
    setSubtask(testArray);
    setEditingSubtaskId("");
  };

  let priorityRef = useRef();
  let dueDateRef = useRef();
  let projectRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!priorityRef.current.contains(e.target)) {
        setPriorityDropdown(false);
      }
      console.log("ppppmmmm", e.target);
      console.log("ppmmm2222", priorityRef.current);
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  useEffect(() => {
    let handler = (e) => {
      if (!dueDateRef.current.contains(e.target)) {
        setDueDateDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  useEffect(() => {
    let handler = (e) => {
      if (!projectRef.current.contains(e.target)) {
        setProjectDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handlePriorityMenuChange = (option) => {
    let todo = {
      ...todoForm,
      ["priorityId"]: option.priorityId,
      ["priorityTitle"]: option.priorityTitle,
    };

    setTodoForm(todo);

    // const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    // const testArray = [...todos];
    // testArray.splice(todoEditIndex, 1, todo);
    // setTodos(testArray);
    setPriorityDropdown(false);
  };

  const handleProjectMenuChange = (option) => {
    setTodoForm((prevState) => ({
      ...prevState,
      ["projectId"]: option.projectId,
      ["projectTitle"]: option.projectTitle,
    }));
  };

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
          <div className={styles.optionContainer}>
            <PriorityDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
            />
            <DuedateDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
            />
            <ProjectDropdown
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
            />
            <LabelDropdown 
              todoForm={todoForm}
              setTodoForm={setTodoForm}
              todoId={todoId}
            />
          </div>
          <div className={styles.todoModalInput}>
            <input
              className={styles.todoModalInputTitle}
              name="todoTitle"
              placeholder="Title"
              value={todoTitle}
              onChange={handleTodoChange}
            />
            <div className={styles.todoDesWrap}>
              <textarea
                className={styles.todoModalInputDescription}
                placeholder="Description"
                name="todoDescription"
                rows="3"
                cols="100"
                value={todoDescription}
                onChange={handleTodoChange}
              />
            </div>
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
    </div>
  );
}

export default TodoModal;
