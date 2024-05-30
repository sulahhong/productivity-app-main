import { useEffect, useRef, useState } from "react";
import styles from "./Activity.module.css";
import { useGlobalContext } from "../context";
import { getDateHourMinuteEng, getStringDate } from "../utill/date";
import { MdModeEdit } from "react-icons/md";

function Activity() {
  const { getUserActivity } = useGlobalContext();
  const [activities, setActivities] = useState([]);

  async function fetchData() {
    const data = await getUserActivity();
    console.log("activities check", data);
    //  setActivities(data.data)
    if (Array.isArray(data.data)) {
      setActivities(data.data);
    } else {
      console.error("Returned data is not an array:", data.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>Activity</h1>
        <p className={styles.titleDes}>descriptions</p>
      </div>
      <div className={styles.contents}>
      {Array.isArray(activities) &&
        activities.map((item) => <div className={styles.content} key={item._id}>{item.comment}</div>)}
      </div>
    </div>
  );
}

export default Activity;
