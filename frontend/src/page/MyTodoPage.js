import React, { useState, useContext, useEffect } from "react";
import styles from "../page/MyTodoPage.module.css";
import { useGlobalContext } from "../context";
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import NewTodoModal from "../modal/NewTodoModal";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  SubMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdCalendarToday,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineToday,
  MdOutlineInfo,
  MdMoreHoriz,
  MdFilterList,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdBlockFlipped,
  MdErrorOutline,
  MdDragIndicator
} from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegListAlt,
  FaUserCircle,
  FaRegStar,
  FaRegEdit,
  FaSearch,
} from "react-icons/fa";

import { FaSignal } from "react-icons/fa";
import { CgSignal } from "react-icons/cg";

import toast, { Toaster } from "react-hot-toast";

function MyTodoPage() {
  const {
    getTodos,
    todo,
    setTodo,
    openTodoModal,
    setOpenTodoModal,
    getLabels,
    deleteTodo,
    getProjectSelf,
    joinProject,
  } = useGlobalContext();
  const { slug, projectId } = useParams();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const projectSeq = async () => {
      const projectMemberResponse = await getProjectSelf(slug, projectId);
      console.log("projectMemberResponse", projectMemberResponse);

      if (projectMemberResponse.data[0] && projectMemberResponse.data[0]._id) {
        getTodos(slug, projectId);
        getLabels(slug, projectId);
      } else {
        joinProject(slug, projectId);
      }
    };

    projectSeq();
  }, []);

  const handleGoBack = () => {
    navigate(`/${slug}/project`);
  };

  const dateFormatter = (date) => {
    const originalDate = new Date(date);

    const formattedDate = originalDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  };

  const goToDetailPage = (todoId) => {
    console.log("Check todo Id", todoId);
    navigate(`/${slug}/project/${projectId}/todo/${todoId}`);
  };

  const getMenuItem = (item) => {
    switch (item) {
      case "1":
        return <MdErrorOutline />;
      case "2":
        return <FaSignal />;
      case "3":
        return <CgSignal />;
      case "4":
        return <CgSignal />;
      case "0":
        return <MdBlockFlipped />;
      default:
        return null;
    }
  };

  const menuClassName = ({ state }) =>
    state === "opening"
      ? styles.menuOpening
      : state === "closing"
      ? styles.menuClosing
      : styles.menu;

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(slug, projectId, todoId);
    await getTodos(slug, projectId);
  };

  const handleCopyClick = (todoId) => {
    // const url = `http://localhost:3000/${slug}/project/${projectId}/todo/${todoId}`;
    // navigator.clipboard
    //   .writeText(url)
    //   .then(() => {
    //     setCopied(true);
    //     toast.success("Successfully copied!");
    //   })
    //   .catch((error) => {
    //     console.error("URL복사실패", error);
    //     toast.error("This is an error!");
    //   });
  };

  return (
    <div className={styles.mytodoPage}>
      <header className={styles.topBar}>
        <div className={styles.topBarGuideMain}>
          <div className={styles.topBarGuideItem}>
            <button
              className={styles.guideButton}
              onClick={() => handleGoBack()}
            >
              <MdKeyboardArrowLeft />
            </button>
            <h1>My TodoList</h1>
          </div>
          <div className={styles.topBarGuideAside}>
            <div className={styles.topBarGuideFilter}>
              <button className={styles.guideButton}>
                <MdFilterList />
              </button>
            </div>
            <div className={styles.topBarGuideAdd}>
              <button
                className={styles.addButton}
                onClick={() => setOpenTodoModal(true)}
              >
                <MdAdd className={styles.todoAddIcon} />
                Add
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainBoard}>
          <div className={styles.mainBoardGridContainer}>
            {todo?.length > 0
              ? todo.map((item) => (
                  <div className={styles.mainBoardGridItem}>
                    <div className={styles.dragIndicator}><MdDragIndicator /></div>
                    <div className={styles.checkbox}>
                      <MdCheckBoxOutlineBlank />
                    </div>
                    {/* <MdOutlineCheckBox /> */}
                    <div className={styles.priorityBox}>
                      {getMenuItem(item.priority.sid)}
                    </div>

                    <div className={styles.statusBox}>{item.status?.title}</div>

                    <div className={styles.titleBox} onClick={() => goToDetailPage(item._id)}>
                      {item.title}
                    </div>

                    <div className={styles.optionGrid}>
                      <div className={styles.labelItemsContainer}>
                        {item.label.length > 0 &&
                          item.label.map((obj, index) => {
                            if (index < 3) {
                              return (
                                <div className={styles.labelItems}>
                                  <div
                                    className={styles.circle}
                                    style={{ backgroundColor: obj.color }}
                                  ></div>
                                  <div>{obj.name}</div>
                                </div>
                              );
                            } else if (index == 3) {
                              return (
                                <div className={styles.labelItems}>
                                  <div>+ {item.label.length - 3} </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                      <div>
                        {item.dueDate && (
                          <div className={styles.todoCardDueDate}>
                            {dateFormatter(item.dueDate)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.assigneeBox}>
                      {item.assignee.length > 0 ?
                        item.assignee.map((obj) => {
                          if (obj.member.detail.avatar) {
                            return (<div className={styles.assigneeBoxItem}>
                              <img
                                className={styles.assigneeBoxAvatar}
                                src={obj.member.detail.avatar}
                              />
                            </div>)
                          } else if (obj.member.detail.avatar == "") {
                            return (
                              <div className={styles.assigneeBoxItem}><FaUserCircle /></div>
                            )
                          }
                        }) : <div className={styles.assigneeBoxItemNone}><FaUserCircle /></div>}
                      {/* {item.assignee.length > 0 &&
                        item.assignee.map((obj, index) => {
                          if (index < 3) {
                            <div>
                              {obj.member.detail.avatar ? (
                                <div>{obj.member.detail.avatar}</div>
                              ) : (
                                <div>0</div>
                              )}
                            </div>;
                          } else if (index == 3) {
                            <div>
                              {obj.member.detail?.avatar ? (
                                <div>{obj.member.detail?.avatar} 외 1명 </div>
                              ) : (
                                <div>0</div>
                              )}
                            </div>;
                          }
                        })} */}
                    </div>

                    <div>
                      <Menu
                        transition
                        menuButton={
                          <MenuButton className={styles.menuButton}>
                            <MdMoreHoriz />
                          </MenuButton>
                        }
                        menuClassName={menuClassName}
                      >
                        <MenuItem>
                          <div
                            className={styles.settingDropdownContentItem}
                            onClick={() => goToDetailPage(item._id)}
                          >
                            Edit issue
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div
                            className={styles.settingDropdownContentItem}
                            onClick={() => handleDeleteTodo(item._id)}
                          >
                            Delete issue
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div
                            className={styles.settingDropdownContentItem}
                            onClick={handleCopyClick(item._id)}
                          >
                            Copy issue link
                          </div>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyTodoPage;
