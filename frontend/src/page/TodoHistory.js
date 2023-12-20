import React, { useEffect, useState } from "react";
import styles from "./TodoHistory.module.css";
import { useGlobalContext } from "../context";
import { MdOutlineReply, MdModeEdit  } from "react-icons/md";
import CommentItem from "./CommentItem";

function TodoHistory({
  slug,
  projectId,
  todoId,
  fetchDataTodoHist,
  todoHistory,
}) {
  const { getTodoHistory, createComment } = useGlobalContext();

  const [reply, setReply] = useState();
  const [replyOn, setReplyOn] = useState(false)

  const handleCommentChange = (e) => {
    setReply(e.target.value);
  };

  const handleCreateCommnet = (item) => {
    console.log("RE", reply);
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
      let name = item.actor.displayName;
      let comment = item.commentBasic;
      let newValue = item.newValue;

      return (
        <div className={styles.historyWrapperItem}>
          <div><MdModeEdit /></div>
          <div className={styles.actor}>{name}</div>
          <div className={styles.historyItem}>{comment}{newValue}</div>
        </div>
      )

      // let renderComment = comment.replace(
      //   /%{displayName}/g,
      //   () => `<div class=${styles.actor}>${name} </div>`
      // );
      // console.log("RC", renderComment);
      // return (
      //   <div
      //     className={styles.historyItem}
      //     dangerouslySetInnerHTML={{ __html: renderComment }}
      //   />
      // );


    } else if (item.type == "comment") {
      return (
        <CommentItem item={item} slug={slug} projectId={projectId} todoId={todoId} fetchDataTodoHist={fetchDataTodoHist} />
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
