import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoSinglePage.module.css";
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
} from "react-icons/md";
import Comments from "../components/Comments";

function TodoSinglePage() {
  const {
    todos,
    setTodos,
    projects,
    targetTodoGlobal,
    setTargetTodoGlobal,
    comments,
    setComments,
    reply,
    setReply,
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
    priority,
    setPriority,
  } = useGlobalContext();

  const { id } = useParams();

  const getTodo = () => {
    let todo = todos.filter((item) => item.todoId == id);
    return todo[0];
  };

  const [todoForm, setTodoForm] = useState(getTodo());
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

  console.log("!!!", todoTitle);

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

  const [onSubtask, setOnSubtask] = useState(false);
  const [isEditingSubtask, setIsEditingSubtask] = useState(false);
  const [editingSubtaskId, setEditingSubtaskId] = useState("");
  const [editSubtaskValue, setEditSubtaskValue] = useState(""); // 저장된 subtaskText 값을 수정할 때 change되는 값 저장

  useEffect(() => {
    // console.log("todopathIdcheck", id);
    // const filterTodoItem = todos.filter((item) => item.todoId === id);
    // setTodoForm(filterTodoItem);
    // const filterCommentItem = comments.filter((item) => item.postId === id);
    // setCommentsForm(filterCommentItem);
    const filterSubtaskItem = subtask.filter(
      (item) => item.subtaskPostId === id
    );
    setSubtaskForm(filterSubtaskItem);

    console.log("todoform", todoForm);
  }, []);

  useEffect(() => {
    console.log("todoform UseEfff", todoForm);
  }, [todoForm]);

  useEffect(() => {
    console.log("TODO PRIO");

    const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    console.log("index", todoEditIndex);

    const testArray = [...todos];
    console.log("test", testArray);
    console.log("LLLLL", todoForm);
    testArray.splice(todoEditIndex, 1, todoForm);

    setTodos(testArray);
  }, [todoPriority, todoDueDate, projectId, projectTitle]);

  const handleTodoChange = (e) => {
    console.log("TODO ATTRIBUTE", e.target.name);
    if (e.target.name == "projectId") {
      const findProject = projects.filter(
        (item) => item.projectId == e.target.value
      );
      console.log("FIND PROJECT", findProject[0].projectTitle);

      //method  A
      setTodoForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        ["projectTitle"]: findProject[0].projectTitle,
      }));

      //method B
      // let projectTitle= findProject[0].projectTitle

      // setTodoForm((prevState) => ({
      //   ...prevState,
      //   [e.target.name]: e.target.value,
      //   projectTitle
      // }));
    } else {
      setTodoForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit testing ", e.target.value);
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubtaskDone = (id) => {
    console.log("sksksksk", id);

    const arr = subtask.map((item) =>
      item.subtaskId == id ? { ...item, subtaskDone: !item.subtaskDone } : item
    );

    console.log("ARRRR", arr);
    setSubtask(arr);
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

  const handleSubtaskDelete = (id) => {
    const newSubtaskArr = subtask.filter((item) => item.subtaskId !== id);
    setSubtask(newSubtaskArr);
  };

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

  const handleCommentChange = (e) => {
    setCommentsForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // setCommentInputValue(e.target.value);
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

  const handleBlur = () => {
    console.log("FOCUS OUT");
    const todoEditIndex = todos.findIndex((item) => item.todoId == todoId);
    console.log("index", todoEditIndex);

    const testArray = [...todos];
    console.log("test", testArray);
    console.log("LLLLL", todoForm);
    testArray.splice(todoEditIndex, 1, todoForm);

    setTodos(testArray);
  };

  const handleTodoTitleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("BBB");
      document.getElementById("todoTitle").blur();
    }
  };

  const handleMenuChange = (option) => {
    console.log("menu", option);
    setTodoForm((prevState) => ({
      ...prevState,
      ["projectId"]: option.projectId,
      ["projectTitle"]: option.projectTitle,
    }));
  };

  const handlePriorityMenuChange = (option) => {
    setTodoForm((prevState) => ({
      ...prevState,
      ["priorityId"]: option.priorityId,
      ["prorityTitle"]: option.priorityTitle,
    }));
  };

  const handleProjectMenuChange = (option) => {
    setTodoForm((prevState) => ({
      ...prevState,
      ["projectId"]: option.projectId,
      ["projectTitle"]: option.projectTitle,
    }));
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

  return (
    <div className={styles.singlePageContainer}>
      <div className={styles.singlePageBody}>
        <div className={styles.singlePageBodyTitle}>Detail page</div>
        <div className={styles.singlePageMain}>
          <div className={styles.textBoxIcons}>
            <button
              className={styles.textBoxIconsingle}
              onClick={() => setPriorityDropdown(!priorityDropdown)}
            >
              <MdOutlinedFlag /> Priority
            </button>
            {priorityDropdown && (
              <div className={styles.priorityDropdownContent} ref={priorityRef}>
                {priority.map((option) => (
                  <div
                    key={option.priorityId}
                    value={option.priorityId}
                    onClick={() => handlePriorityMenuChange(option)}
                  >
                    {option.priorityTitle}
                  </div>
                ))}
              </div>
            )}
            <button
              className={styles.textBoxIconsingle}
              onClick={() => setDueDateDropdown(!dueDateDropdown)}
            >
              <MdCalendarToday /> Date
            </button>
            {dueDateDropdown && (
              <input
                ref={dueDateRef}
                className={styles.dueDateDropdownContent}
                type="date"
                value={todoDueDate}
                name="todoDueDate"
                onChange={handleTodoChange}
              />
            )}
            <button
              className={styles.textBoxIconsingle}
              onClick={() => setProjectDropdown(!projectDropdown)}
            >
              <MdGridView /> Project
            </button>
            {projectDropdown && (
              <div className={styles.projectDropdownContent} ref={projectRef}>
                {projects.length > 0 &&
                  projects.map((option) => (
                    <div
                      key={option.projectId}
                      value={option.projectId}
                      onClick={() => handleProjectMenuChange(option)}
                    >
                      {option.projectTitle}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className={styles.singlePageInput}>
            <input
              className={styles.singlePageInputTitle}
              id="todoTitle"
              name="todoTitle"
              placeholder="Title"
              value={todoTitle}
              onBlur={handleBlur}
              onChange={handleTodoChange}
              onKeyDown={(e) => handleTodoTitleEnter(e)}
            />
          </div>
          <div className={styles.singlePageInput}>
            <input
              className={styles.singlePageDesInput}
              placeholder="Description"
              name="todoDescription"
              value={todoDescription}
              onBlur={handleBlur}
              onChange={handleTodoChange}
            />
          </div>
          {/* <div className={styles.singlePagePriorityInput}>
            <select
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
          <div className={styles.singlePageDueDateInput}>
            <input
              type="date"
              value={todoDueDate}
              name="todoDueDate"
              onChange={handleTodoChange}
            />
          </div>
          <div className={styles.singlePageProjectInput}>
            <select
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
          </div> */}
        </div>
      </div>

      {/* MENU */}
      {/* {
        <div className={styles.singlePageProject}>
          {projects.length > 0 &&
            projects.map((option) => (
              <div
                key={option.projectId}
                value={option.projectId}
                onClick={() => handleMenuChange(option)}
              >
                {option.projectTitle}
              </div>
            ))}
        </div>
      } */}
      <div className={styles.todoSubtask}>
        {onSubtask ? (
          <div>
            <input
              placeholder="Task name"
              value={subtaskText}
              onChange={handleSubtaskChange}
            />
            <button onClick={handleCreateSubtask}>입력</button>
            <button onClick={() => setOnSubtask(false)}>취소</button>
          </div>
        ) : (
          <div
            className={styles.todoSubtaskBtn}
            onClick={() => setOnSubtask(true)}
          >
            <MdAdd /> Sub task
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
                        value={editSubtaskValue}
                        onChange={(e) => setEditSubtaskValue(e.target.value)}
                      />
                      <button onClick={() => handleSubtaskEditing(item)}>
                        수정
                      </button>
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

      <div className={styles.singleComments}>
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
            <button onClick={handleCreateComment}>입력</button>
          </div>

          {comments &&
            comments
              .filter((item) => item.postId == todoId)
              .map((item) => <Comments item={item} />)}
        </div>
      </div>
    </div>
  );
}

export default TodoSinglePage;
