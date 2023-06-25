import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import styles from "./TodoSinglePage.module.css"

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
  } = useGlobalContext();

  const { id } = useParams();

  const getTodo = () => {
    let todo = todos.filter(item => item.todoId == id)
    return todo[0]
  }

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

  console.log("!!!", todoTitle)

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

  useEffect(() => {
    // console.log("todopathIdcheck", id);
    // const filterTodoItem = todos.filter((item) => item.todoId === id);
    // setTodoForm(filterTodoItem);
    const filterCommentItem = comments.filter((item) => item.postId === id);
    setCommentsForm(filterCommentItem);
    const filterSubtaskItem = subtask.filter(
      (item) => item.subtaskPostId === id
    );
    setSubtaskForm(filterSubtaskItem);

    console.log("todoform", todoForm)
  }, []);

  useEffect(() => {
    console.log("todoform UseEfff", todoForm)
  }, [todoForm])

  const handleTodoChange = (e) => {
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    
  };

  return (
    <div className={styles.singlePageContainer}>
      <div>
        <input
          name="todoTitle"
          placeholder="Title"
          value={todoTitle}
          onChange={handleTodoChange}
        />
      </div>
      <div>
        <input
          placeholder="Description"
          name="todoDescription"
          value={todoDescription}
          onChange={handleTodoChange}
        />
      </div>
      <div>
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
      <div>
      <input
                className="todoDueDateInput"
                type="date"
                value={todoDueDate}
                name="todoDueDate"
                onChange={handleTodoChange}
              />
      </div>
      <div>
      <select
              name="projectId"
              value={projectId}
              onChange={handleTodoChange}
            >
                </select>
      </div>

    </div>
  );
}

export default TodoSinglePage;
