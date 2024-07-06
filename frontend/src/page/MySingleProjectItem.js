import React, { useState, useContext, useEffect } from "react";
import styles from "../page/MyWorkspacePage.module.css";
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft, MdOutlineSettings } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

function MySingleProjectItem({item}) {
  const {
    project,
		user,
		getProjectMembers,
  } = useGlobalContext();
	const [projectMembers, setProjectMembers] = useState();

  const { slug } = useParams();

  const navigate = useNavigate();

	const handleJoinClick = (e) => {
		e.stopPropagation();
		// join project API 요청

	}

	const fetchProjectMember = async () => {
		const res = await getProjectMembers(slug, item._id)
		setProjectMembers(res.data)
	}

	useEffect(() => {
		fetchProjectMember()
	}, [])

  return (
          <div className={styles.wspaceItem}>
            <div className={styles.wspaceItem2} onClick={() => navigate(`/${slug}/project/${item._id}`)}>
              <div className={styles.wspaceIcon}></div>
              <div className={styles.wspaceName}>
                <div className={styles.wspaceTitle}>{item.title}</div>
                <div className={styles.projectLabels}>
                  {user._id === item.createdBy ? <div className={styles.projectLabel}>Created</div> : null}
                  {item.publicYn === true ? <div className={styles.projectLabel}>Public</div> : <div className={styles.projectLabel}>Private</div>}
									
                  {<div className={styles.projectLabel} onClick={handleJoinClick}>Joined</div>}
                </div>
              </div>

              {/* <div className={styles.wspaceLabel}>joined</div> */}
            </div>
            <div className={styles.wspaceItem3}>
              <div>{item.description}</div>
              <div className={styles.projectSettings}>
                <div className={styles.projectSettingsMember}>
									{projectMembers?.map((obj) => (
										<div key={obj._id}>{obj.member.name}</div>
									))}
									</div>
                <div className={styles.projectSettingIcon} onClick={() => navigate(`/${slug}/settings/project/${item._id}`)}>
                  <MdOutlineSettings />
                </div>
              </div>
            </div>
          </div>
  );
}

export default MySingleProjectItem;
