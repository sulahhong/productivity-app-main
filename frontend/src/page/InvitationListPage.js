import React, { useEffect } from 'react'
import styles from "./InvitationListPage.module.css";
import { useGlobalContext } from '../context';


function InvitationListPage() {
const { getMyInvitation, setOpenInviteModal } = useGlobalContext();

const fetchData = async () => {
	const data = await getMyInvitation();
	console.log("getMyInvitation", data)
}

useEffect(() => {
	fetchData();
}, [])

	return (
		<div className={styles.wrapper}>
		<div className={styles.header}>
			<div className={styles.headerItem}>
				<h1 className={styles.headerItemTitle}>Invitation List</h1>
				
			</div>
		</div>
		<div className={styles.memberMain}>
			invited list in here
		</div>
		</div>
	)
}

export default InvitationListPage