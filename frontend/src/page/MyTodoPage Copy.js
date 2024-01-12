import React, { useState, useContext, useEffect } from "react";
import styles from "../page/MyWorkspacePage.module.css";
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
} from "react-icons/md";
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

    const projectSeq = async()=>{
      const projectMemberResponse = await getProjectSelf(slug, projectId)
      console.log("projectMemberResponse", projectMemberResponse)
      
      if(projectMemberResponse.data[0] && projectMemberResponse.data[0]._id){
        getTodos(slug, projectId);
        getLabels(slug, projectId);
      }else{
        joinProject(slug, projectId)
      }
    }

    projectSeq()
    

    
  }, []);

  

  const handleGoBack = () => {
    navigate(`/${slug}/project`);
  };

  const dateFormatter = (date) => {
    const originalDate = new Date(date);

    const formattedDate = originalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  };

  const goToDetailPage = (todoId) => {
    console.log("Check todo Id", todoId);
    navigate(`/${slug}/project/${projectId}/todo/${todoId}`);
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
    <div className={styles.mainContainer}>
      <div className={styles.todoBody}>
        <div className={styles.todoGuideBar}>
          <div className={styles.todoGuideBarLeftside}>
            <button
              className={styles.todoGuideBarLeftItem}
              onClick={() => handleGoBack()}
            >
              <MdKeyboardArrowLeft />
            </button>
            <span className={styles.todoGuideBarLeftText}>My TodoList</span>
          </div>

          <div>
            <button
              className={styles.todoAddButton}
              onClick={() => setOpenTodoModal(true)}
            >
              <MdAdd className={styles.todoAddIcon} />
              Add
            </button>
          </div>
        </div>
      </div>
      <div className={styles.myTodoPageMain}>
      <div className={styles.todoFilter}>All Issues {todo?.length}</div>
      <div className={styles.todoContent}>
        {todo?.length > 0 ? (
          todo.map((item) => (
            <div className={styles.todoSingleItem}>
              <div
                className={styles.todoItemTitle}
                onClick={() => goToDetailPage(item._id)}
              >
                {item.title}
              </div>
              <div className={styles.todoOption}>
                <div className={styles.labelDisplaySide}>
                  {item.status._id && (
                    <div className={styles.todoStatus}>
                      {item.status?.title}
                    </div>
                  )}
                  <div className={styles.todoStatus}>
                    {" "}
                    {item.priority?.title}
                  </div>

                  {/* <div>{item.createBy.name}</div> */}

                  {item.label.length > 0 &&
                    item.label.map((obj, index) =>
                    {
                      if(index < 3){
                        return (
                        <div className={styles.todolabels}>
                        <div
                          className={styles.circle}
                          style={{ backgroundColor: obj.color }}
                        ></div>
                        <div>{obj.name}</div>
                      </div>)
                      }else if(index == 3){
                        return (
                        <div className={styles.todolabels}>
                        <div
                          className={styles.circle}
                          style={{ backgroundColor: obj.color }}
                        ></div>
                        <div>{item.label.length - 3} other labels</div>
                      </div>)
                      }
                    } 
                    
                    )}

{/* {item.label.length > 0 &&
                    item.label.map((obj) => (
                      <div className={styles.todolabels}>
                        <div
                          className={styles.circle}
                          style={{ backgroundColor: obj.color }}
                        ></div>
                        <div>{obj.name}</div>
                      </div>
                    ))} */}

                  <div className={styles.todoCardDueDate}>
                    {item.dueDate && (
                      <div className={styles.todoCardDueDate}>
                        <MdCalendarToday className={styles.dueDateIcon} />
                        {dateFormatter(item.dueDate)}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.todoDelSide}>
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
            </div>
          ))
        ) : (
          <div className={styles.wspaceContent}></div>
        )}
      </div>

      </div>
    </div>
  );
}

export default MyTodoPage;
