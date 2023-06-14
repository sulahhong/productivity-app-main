import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { useGlobalContext } from "../context";
import { MdThumbUp, MdReply, MdModeEdit, MdDelete } from "react-icons/md";

function Reply({ item }) {
  const { user, reply, setReply } = useGlobalContext();

  useEffect(() => {
    console.log("ittttt", item);
    setReplyForm(item);
  }, []);

  const [replyForm, setReplyForm] = useState({
    replyId: "",
    replyText: "",
    replyAuthor: user,
    replyCreateTime: "",
    replyUpdateTime: "",
    replyTo: "",
  });

  const {
    replyId,
    replyText,
    replyAuthor,
    replyCreateTime,
    replyUpdateTime,
    replyTo,
  } = replyForm;

  const [isEditingReply, setIsEditingReply] = useState(false);

  const handleDeleteReply = (id) => {
    console.log("deleteReply", id);
    const newReplyArray = reply.filter((item) => item.replyId !== id);
    console.log("replydeltest", newReplyArray);
    setReply(newReplyArray);
  };

  const handleReplyChange = (e) => {
    setReplyForm((prevState) => ({
      ...prevState,
      replyText: e.target.value,
    }));
  };

  const handleEditReply = (id) => {
    console.log("replyyyyy", id);
    const replyEditIndex = reply.findIndex((item) => item.replyId == id);
    console.log("indexxxxx", replyEditIndex);
    const testArr = [...reply];
    console.log("testttttt", testArr);

    let data = {
      ...replyForm,
      replyUpdateTime: new Date(),
    };

    console.log("SAVEEEE", data);
    testArr.splice(replyEditIndex, 1, data);

    setReply(testArr);
    setIsEditingReply(false);
  };

  return (
    <div>
      <div className={styles.replyContainer}>
        <div className={styles.replyUser}>
          <div className={styles.replyFirstPart}>
            <div className={styles.replyLikeBox}>
              <MdThumbUp />
              {0}
            </div>
            <div className={styles.replyAuthorPart}>
              <div className={styles.replyUserName}>
                {item.replyAuthor.userName}
              </div>
              <div className={styles.replyDate}>
                {new Date(item.replyCreateTime).toLocaleDateString("ko-KR")}
              </div>
            </div>
          </div>
          <div className={styles.replyBtn}>
            <button
              className={styles.replyInBtn}
              onClick={() => {
                setIsEditingReply(!isEditingReply);
              }}
            >
              <MdModeEdit />
            </button>
            <button
              className={styles.replyInBtn}
              onClick={() => handleDeleteReply(item.replyId)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
        {isEditingReply ? (
          <div>
            <input type="text" value={replyText} onChange={handleReplyChange} />
            <button onClick={() => handleEditReply(replyId)}>수정</button>
            <button onClick={() => setIsEditingReply(isEditingReply == false)}>
              취소
            </button>
          </div>
        ) : (
          <div className={styles.replyTextBox}>{item.replyText}</div>
        )}
      </div>
    </div>
  );
}

export default Reply;
