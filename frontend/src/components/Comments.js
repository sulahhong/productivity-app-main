import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";

function Comments({ item }) {
  const { reply, setReply, user, setUser } = useGlobalContext();

  const [replyForm, setReplyForm] = useState({
    replyId: "",
    replyText: "",
    replyAuthor: user,
    replyCreateTime: "",
    replyUpdateTime: "",
   replyTo:"",
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

  const handleOnChange = (e) => {
    setReplyInputValue(e.target.value);
  };

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
    if(replyCreateTime && replyId && replyTo ) {
        console.log("reply useEffect is Checked")
        
    setReply([...reply, replyForm])
    setReplyForm({
        replyId: "",
        replyText: "",
        replyAuthor: user,
        replyCreateTime: "",
        replyUpdateTime: "",
        replyTo:"",
    })
    setReplyInputValue("");
    setOnReply(false)
    }


  }, [replyForm])

  return (
    <>
      <div className={styles.commentsContainer}>
        <div className={styles.commentUser}>
          <div>{item.commentAuthor.userName}</div>
          <div>{item.commentCreateTime.toString()}</div>
        </div>
        <div>{item.commentText}</div>
        <button onClick={() => setOnReply(!onReply)}>reply</button>
      </div>
      {onReply && (
        <div>
          <input
            type="text"
            value={replyInputValue}
            onChange={handleOnChange}
          />
          <button 
          onClick={handelCreateReply}>
          입력</button>
        </div>
      )}
      {reply.filter(obj => obj.replyTo == item.commentId).map((item) => <div>{item.replyText}</div>)}
    </>
  );
}

export default Comments;
