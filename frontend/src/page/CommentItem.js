import React, { useState } from "react";
import styles from "./CommentPage.module.css";
import { MdAttachFile, MdOutlineReply, MdMoreHoriz } from "react-icons/md";
import { useGlobalContext } from "../context";

function CommentItem({ item, slug, projectId, todoId, fetchDataTodoHist }) {
  const { getTodoHistory, createComment } = useGlobalContext();
  const [reply, setReply] = useState();
  const [replyOn, setReplyOn] = useState(false);

  const handleCommentChange = (e) => {
    setReply(e.target.value);
  };

  const handleCreateCommnet = async(item) => {
    console.log("RE", reply);
    await createComment(slug, projectId, todoId, reply, item._id);
    await fetchDataTodoHist()
    await setReply("")
  };

  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.commentItemMainWrapper}>
        <div className={styles.commentItemHeader}>
          <div>{item.actor.displayName}</div>
          <div className={styles.commentItemHeaderIcons}>
            <div
              className={styles.commentItemHeaderIcon}
              onClick={() => setReplyOn(!replyOn)}
            >
              <MdOutlineReply />
            </div>
            <div className={styles.commentItemHeaderIcon}>
              <MdMoreHoriz />
            </div>
          </div>
        </div>
        <div className={styles.commentItemMain}>{item.content}</div>
      </div>
      {item.replies.map((reply) => (
        <div className={styles.commentReplyItemWrapper}>
          <div>
            <div className={styles.replyActor}>{reply.actor.displayName}</div>
            <div>{reply.content}</div>
          </div>
        </div>
      ))}

      {replyOn || item.replies.length > 0 ? (
        <div className={styles.replyItemWrapper}>
          <input
            className={styles.replyItemInput}
            placeholder="Leave a Reply.."
            value={reply}
            onChange={handleCommentChange}
          />
          <button className={styles.replyItemBtn} onClick={() => handleCreateCommnet(item)}>Reply</button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentItem;
