import React, { useEffect, useState } from "react";
import styles from "./TodoHistory.module.css";
import { useGlobalContext } from "../context";
import { MdOutlineReply, MdModeEdit } from "react-icons/md";
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
  const [replyOn, setReplyOn] = useState(false);

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

  const historyDataParser = (item) => {
    let value = { text: "", color: "" };
    console.log("JSONPARSER", JSON.parse(item.newValue))

    switch (item.field) {
      case "1":
        value = { text: "", color: "" };
        break;
      case "dueDate":
        value = {
          text: new Date(JSON.parse(item.newValue)).toLocaleDateString("ko-KR"),
          color: "",
        };
        break;
      case "status":
        value = { text: JSON.parse(item.newValue).title, color: "" };
        break;
      case "priority":
        value = { text: JSON.parse(item.newValue).title, color: "" };
        break;
      case "label":
        value = {
          text: JSON.parse(item.newValue).name,
          color: JSON.parse(item.newValue).color,
        };
        break;
      case "assignee":
        value = { text: JSON.parse(item.newValue).member.detail?.displayName,
                  color: ""};
        break;
      // case "parent":
      //   value = {
      //     text: JSON.parse(item.newValue)
      //   }
    }
    return value;
  };

  const historyHtmlParser = (item, value) => {
    if (item.field == "label") {
      return (
        <div className={styles.displyedLabel}>
          <div
            className={styles.circle}
            style={{ backgroundColor: value.color }}
          ></div>
          <span> {value.text}</span>
        </div>
      );
    } else {
      return (
        <div className={styles.historyValue} style={{ fontWeight: 600 }}>
          {value.text}
        </div>
      );
    }
  };

  const handle = (item) => {
    if (item.type == "action") {
      let name = item.actor.displayName;
      let comment = item.commentBasic;

      let value = historyDataParser(item);

      return (
        <div className={styles.historyWrapperItem}>
          <div className={styles.historyIcon}>
            <MdModeEdit />
          </div>
          <div className={styles.actor}>{name}</div>
          <div className={styles.historyItem}>
            <div className={styles.historyValue}>{comment}</div>{" "}
            {historyHtmlParser(item, value)}
          </div>
        </div>
      );

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
        <div className={styles.comment}>
          <div className={styles.commentAvatar}>
            <img className={styles.userAvatar} src={item.user.detail.avatar} />
          </div>
          <CommentItem
            item={item}
            slug={slug}
            projectId={projectId}
            todoId={todoId}
            fetchDataTodoHist={fetchDataTodoHist}
          />
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
