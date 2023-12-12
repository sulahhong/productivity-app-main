import React, { useEffect, useState } from "react";
import styles from "./TodoHistory.module.css";
import { useGlobalContext } from "../context";

function TodoHistory({ slug, projectId, todoId, fetchDataTodoHist, todoHistory }) {
  const { getTodoHistory, createComment } = useGlobalContext();

  const [reply, setReply] = useState();

  const handleCommentChange = (e) => {
    setReply(e.target.value);
  };

  const handleCreateCommnet = (item) => {
    console.log("RE", reply)
    createComment(slug, projectId, todoId, reply, item._id);
  };

//   const [todoHistory, setTodoHistory] = useState([]);

//   async function fetchDataTodoHist() {
//     const data = await getTodoHistory(slug, projectId, todoId);
//     setTodoHistory(data);
//   }
  //must live inside todoDetail, so that any componets can call it (of ocurse, you need to pass as props) + todoHistory state must be moved to todoDetail

  useEffect(() => {
    fetchDataTodoHist();
  }, []);

  const handle = (item) => {
    if (item.type == "action") {
      console.log("ddd", item);
      let name = item.actor.name;
      let comment = item.comment;

      let renderComment = comment.replace(
        /%{displayName}/g,
        () => `<div class=${styles.actor}>${name} </div>`
      );
      console.log("RC", renderComment);
      return (
        <div
          className={styles.historyItem}
          dangerouslySetInnerHTML={{ __html: renderComment }}
        />
      );
    } else if (item.type == "comment") {
      return (
        <div className={styles.historyListWrapper}>
          <div className={styles.historyList}>
            <div className={styles.historyListItem}>{item.actor.name}</div>
            <div className={styles.historyListItem}>{item.content}</div>
          </div>
          {item.replies.map((reply) => (
            <div className={styles.historyList}>
            <div className={styles.historyListItem}>{reply.actor.name}</div>
            <div className={styles.historyListItem}>{reply.content}</div>
          </div>
          ))}
          <div>
            <input
              className={styles.commentInput}
              placeholder="Leave a Comment.."
              value={reply}
              onChange={handleCommentChange}
            />
            <button onClick={() => handleCreateCommnet(item)}>Reply</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.historyWrapper}>
      <div className={styles.historyHeader}>
        <h1>Activity</h1>
      </div>
      <div className={styles.historyMainWrapper}>
        {todoHistory.map((item) => (
          <div className={styles.historyMain}>{handle(item)}</div>
        ))}
      </div>
    </div>
  );
}

export default TodoHistory;
