import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import { MdThumbUp, MdReply, MdModeEdit, MdDelete } from "react-icons/md";

function Comments({
  item,
  

}) {
  const {
    reply,
    setReply,
    user,
    setUser,
    comments,
    setComments,
    targetCommentGlobal,
    setTaegetCommentGlobal,

  } = useGlobalContext();

  
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

  const [onReply, setOnReply] = useState(false);
  const [replyInputValue, setReplyInputValue] = useState("");
  const [isEditingComment, setIsEditingComment] = useState(false);

  const handleOnChange = (e) => {
    setReplyInputValue(e.target.value);
  };

  useEffect(()=>{
    console.log("ITEM", item)
    setCommentsForm(item)
  }, [])

  const handelCreateReply = () => {
    const replyCreateTime = new Date();
    const replyId = uuidv4();
    const replyTo = item.commentId;
    const replyText = replyInputValue;

    console.log("createreply", replyCreateTime, replyId, replyTo);

    setReplyForm((prevState) => ({
      ...prevState,
      replyCreateTime,
      replyId,
      replyTo,
      replyText,
    }));
  };

  useEffect(() => {
    if (replyCreateTime && replyId && replyTo) {
      console.log("reply useEffect is Checked");

      setReply([...reply, replyForm]);
      setReplyForm({
        replyId: "",
        replyText: "",
        replyAuthor: user,
        replyCreateTime: "",
        replyUpdateTime: "",
        replyTo: "",
      });
      setReplyInputValue("");
      setOnReply(false);
    }
  }, [replyForm]);

  const handleDeleteComment = (id) => {
    console.log("delete comment ", id);
    const newCommentsArray = comments.filter((item) => item.commentId !== id);
    console.log("deldeldelComents", newCommentsArray);
    const newReplyArray = reply.filter((item) => item.replyTo !== id);
    console.log("sssss", newReplyArray);
    setComments(newCommentsArray);
    setReply(newReplyArray);
  };

  const handleEditComment = (id) => {
    // const targetComment = comments.find((item) => item.commentId === id)
    // console.log("targetComment", targetComment, id )
    const commentEditIndex = comments.findIndex((item) => item.commentId == id);
    console.log("index", commentEditIndex);

    const testArray = [...comments];
    console.log("test", testArray);

    let data = {
     ...commentsForm,
      commentUpdateTime: new Date() ,
    };

    // let data = {
    //   commentAuthor: commentAuthor,
    //   commentCreateTime: commentCreateTime,
    //   commentUpdateTime: new Date() ,
    //   commentIsReply: false,
    //   postId: postId,
    //   commentId: commentId,
    //   commentText: commentText,
    // };

    console.log("SAVE DATA", data);
    testArray.splice(commentEditIndex, 1, data)

    setComments(testArray)
    setIsEditingComment(false)
  };

  const handleDeleteReply = (id) => {
    console.log("deleteReply", id)
    const newReplyArray = reply.filter((item) => item.replyId !== id)
    console.log("replydeltest", newReplyArray)
    setReply(newReplyArray)
  }

  const handleCommentChange = (e) => {
    
      // setCommentsForm((prevState) => ({
      //   ...prevState,
      //   [e.target.name]: e.target.value
      // }))

      setCommentsForm((prevState) => ({
        ...prevState,
        commentText: e.target.value
      }))
  }


  return (
    <>
      <div className={styles.commentsContainer}>
        <div className={styles.commentUser}>
          <div className={styles.commentFirstPart}>
            <div className={styles.commentLikeBox}>
              <MdThumbUp />
              {0}
            </div>
            <div className={styles.commentAuthorPart}>
              <div className={styles.commentUserName}>
                {item.commentAuthor.userName}
              </div>
              <div className={styles.commentDate}>
                {new Date(item.commentCreateTime).toLocaleDateString("ko-KR")}
              </div>
            </div>
          </div>
          <div className={styles.commentBtn}>
            <button
              className={styles.commentReplyBtn}
              onClick={() => setIsEditingComment(!isEditingComment)}
            >
              <MdModeEdit />
            </button>
            <button
              className={styles.commentReplyBtn}
              onClick={() => handleDeleteComment(item.commentId)}
            >
              <MdDelete />
            </button>
            <button
              className={styles.commentReplyBtn}
              onClick={() => setOnReply(!onReply)}
            >
              <MdReply />
            </button>
          </div>
        </div>
        
        
        {isEditingComment ? (
          <div>
            <input type="text" value={commentText} onChange={handleCommentChange} name="commentText" />
            <button onClick={() => handleEditComment(item.commentId)}>수정</button>
          </div>
        ) : (
          <div className={styles.commentTextBox}>{item.commentText}</div>
        )}
      </div>
      {onReply && (
        <div className={styles.commentInput}>
          <input
            type="text"
            value={replyInputValue}
            onChange={handleOnChange}
          />
          <button
            className={styles.commentInputButton}
            onClick={handelCreateReply}
          >
            입력
          </button>
        </div>
      )}
      {reply
        .filter((obj) => obj.replyTo == item.commentId)
        .map((item) => (
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
                <button className={styles.replyInBtn}>
                  <MdModeEdit />
                </button>
                <button className={styles.replyInBtn}
                  onClick={() => handleDeleteReply(item.replyId)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className={styles.replyTextBox}>{item.replyText}</div>
          </div>
        ))}
    </>
  );
}

export default Comments;
