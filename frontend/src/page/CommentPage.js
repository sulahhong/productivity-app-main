import React, { useState } from "react";
import styles from "./CommentPage.module.css";
import { MdAttachFile } from "react-icons/md";
import { useGlobalContext } from "../context";

function CommentPage({ slug, projectId, todoId, fetchDataTodoHist }) {
  const { createComment } = useGlobalContext();

  const [comment, setComment] = useState();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCreateCommnet = async () => {
    const success = await createComment(slug, projectId, todoId, comment, null);

    if (success) {
      await setComment("");
      await fetchDataTodoHist();
    }
  };

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentHeader}>
        <input
          className={styles.commentInput}
          placeholder="Leave a Comment.."
          value={comment}
          onChange={handleCommentChange}
        />
        <div className={styles.commentFooter}>
          <button className={styles.commentIcon}>
            <MdAttachFile className={styles.Icon} />
          </button>
          <button className={styles.commentBtn} onClick={handleCreateCommnet}>
            comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentPage;
