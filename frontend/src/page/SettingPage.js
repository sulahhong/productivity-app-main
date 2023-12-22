import React, { useEffect, useRef, useState } from "react";
import styles from "./SettingPage.module.css";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegListAlt,
  FaUserCircle,
  FaRegStar,
  FaRegEdit,
  FaSearch,
} from "react-icons/fa";
import { useGlobalContext } from "../context";

function SettingPage() {
  const { uploadUserAvatar, getMe, updateUser } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState(null);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    avatar: "",
    displayName: "",
  });

  const { name, email, avatar, displayName } = profileForm;

  async function fetchData() {
    const data = await getMe(name, email, avatar, displayName);
    console.log("profile data check", data);
    setProfileForm(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    console.log("IMG");

    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    console.log("IMG 2");
    //start laoding vbar
    return uploadUserAvatar(selectedImage);
    // return은 해당 function에게 return 값의 true(selectedImage) or false(!selectedImage)를 전달
    // 그래서 하단의 await으로 값을 전달해서 uploadSuccess 가 true가 되면 fetchData를 실행함
  };

  useEffect(() => {
    const uploadAndGet = async () => {
      const uploadSuccess = await handleUpload();
      if (uploadSuccess) {
        //stop loading bar
        await fetchData();
      }
    };

    if (selectedImage != null) {
      uploadAndGet();
    }

    console.log("GG");
  }, [selectedImage]);


  const handleSettingChange = (e) => {
      setProfileForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
  }

  const handleUpdateUser = () => {
    return updateUser(profileForm)
  }

  useEffect(() => {
    const updateAndGet = async() => {
      const success = await handleUpdateUser();
      if (success) {
        await fetchData()
      }
    }
  }, [])

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileMain}>
        <h1 className={styles.profileTitle}>Profile</h1>
        <p className={styles.profileTitleDes}>Manage your profile</p>
      </div>
      <div className={styles.profileUserPhoto}>
        <div className={styles.profileUserWrapper} onClick={handleIconClick}>
          {avatar ? (
            <div className={styles.profileUserImg}>
              <img className={styles.profileUserImgItem} src={avatar} />
            </div>
          ) : (
            <div className={styles.profileUserDefaultIcon}>
              <FaUserCircle />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className={styles.profileContents}>
        <div className={styles.profileContentsItem}>
          <label className={styles.profileItemLabel}>Your Email</label>
          <input className={styles.profileItemInput} placeholder="email"
            name="email"
            value={email}
          />
        </div>
        <div className={styles.profileContentsItem}>
          <label className={styles.profileItemLabel}>Your Name</label>
          <input className={styles.profileItemInput} placeholder="name" 
          name="name"
          value={name}
          onChange={handleSettingChange}
          />
        </div>
        <div className={styles.profileContentsItem}>
          <label className={styles.profileItemLabel}>Your Display Name</label>
          <input
            className={styles.profileItemInput}
            placeholder="displayName"
            name="displayName"
            value={displayName}
            onChange={handleSettingChange}
          />
        </div>
      </div>
      <div className={styles.profileFooter}>
        <button className={styles.profileSaveBtn} onClick={handleUpdateUser}>Save</button>
      </div>
    </div>

  );
}

export default SettingPage;
