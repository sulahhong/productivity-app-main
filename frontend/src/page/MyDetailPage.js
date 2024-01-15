import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from '../context';
import styles from "./MyDetailPage.module.css";
import {
    MdOutlineClose,
    MdKeyboardArrowLeft,
    MdVerticalSplit,
  } from "react-icons/md";


function MyDetailPage() {

    const {
        openSideModal,
        setOpenSideModal,
        labels,
        setLabels,
        getTodoById,
        status: statusOpt,
        priority: priorityOpt,
        updateTodo,
        getTodoHistory,
        addTodoAttachment,
      } = useGlobalContext();

      const { slug, projectId, todoId } = useParams();
      const navigate = useNavigate();
      const fileInputRef = useRef(null);
    
      const [todoForm, setTodoForm] = useState({
        title: "",
        description: "",
        priority: priorityOpt[0],
        status: statusOpt[0],
        dueDate: "",
        parent: null,
        label: [],
        assignee: [],
      });
    
      const { title, description, priority, status, dueDate, label } = todoForm;
    
      const [todoHistory, setTodoHistory] = useState([]);
      const [selectedAttachment, setSelectedAttachment] = useState(null);
    
      async function fetchData() {
        const data = await getTodoById(slug, projectId, todoId);
        console.log("DATA CHECK", data);
        setTodoForm(data.data);
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    
      async function fetchDataTodoHist() {
        const data = await getTodoHistory(slug, projectId, todoId);
        setTodoHistory(data);
      }

      const handleUpdateTodoAPI = async (todo) => {
        await updateTodo(slug, projectId, todoId, todo);
        await fetchData();
        await fetchDataTodoHist();
      };
    
      const handleTodoChange = (e) => {
        setTodoForm((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleAddLabel = (selectedLabel) => {
        console.log("check selectedLabel", selectedLabel);
    
        const selectedLabelObject = labels.find(
          (item) => item._id === selectedLabel._id
        );
    
        let label = [...todoForm.label];
    
        let labelIndex = label.findIndex(
          (item) => item._id == selectedLabelObject._id
        );
    
        if (labelIndex == -1) {
          label.push(selectedLabelObject);
          // label = [...label,  selectedLabelObject]
        } else {
          label.splice(labelIndex, 1);
        }
    
        const updatedTodo = {
          ...todoForm,
          label: label,
        };
    
        console.log("updatedTodo", updatedTodo);
    
        setTodoForm(updatedTodo);
        if (todoForm._id) {
          handleUpdateTodoAPI(updatedTodo);
        }
      };
    
      const handleIconClick = () => {
        fileInputRef.current.click();
      };
    
      const handleAttachmentChange = (e) => {
        const file = e.target.files[0];
        setSelectedAttachment(file)
      }
    
      const handleAttachmentUpload = async () => {
        await addTodoAttachment(slug, projectId, todoId)
      }
    
      
    

  return (
    <div className={styles.wrapper}>
        <div className={styles.page}>
        <div className={styles.pageHeader}>
        <button
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              <MdKeyboardArrowLeft />
            </button>
            <div className={styles.headerTitle}>
              
              {projectId && (
                <div className={styles.singlepageGuideBar}>
                  {/* | Issue {project.identifier} Details */}
                  {/* 프로젝트 이름으로 변경할 예정  */}
                  <span>{title} </span>
                </div>
              )}
            </div>
        </div>
        <div className={styles.pageMain}>
            <div className={styles.todoTitle}>
            <input
              className={styles.singlePageInputTitle}
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onBlur={() => handleUpdateTodoAPI(todoForm)}
              onChange={handleTodoChange}
              //   onKeyDown={(e) => handleTodoTitleEnter(e)}
            />
            </div>
        </div>
        <div className={styles.pageFooter}>comment</div>
        </div>

    </div>
  )
}

export default MyDetailPage