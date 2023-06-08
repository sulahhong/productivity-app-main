import React, { useState } from 'react'
import styles from "./Comments.module.css";

function Comments({item}) {

    const [onReply, setOnReply] = useState(false);

  return (
    <>
    <div className={styles.commentsContainer}>
        <div className={styles.commentUser}>
        <div>{item.commentAuthor.userName}</div>
        <div>{item.commentCreateTime}</div>
        </div>
        <div>{item.commentText}</div>
        <button onClick={()=>setOnReply(!onReply)}>reply</button>
        
    </div>
    {onReply && <div><input /><button>입력</button></div>}
    </>
  )
}

export default Comments;
