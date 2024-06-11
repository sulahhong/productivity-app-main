import React, { useEffect, useState } from "react";
import styles from "../page/MyTodoPage.module.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-responsive-modal/styles.css";
import {
  MdMoreHoriz,
  MdCheckBoxOutlineBlank,
  MdBlockFlipped,
  MdDragIndicator,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";
import { FaSignal } from "react-icons/fa";
import { CgSignal } from "react-icons/cg";

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import StatusDropdown2 from "../modal/Dropdown/StatusDropdown";
import PriorityDropdown2 from "../modal/Dropdown/PriorityDropdown2";

function MySingleTodoItem({ slug, projectId, item }) {
  const { getTodos, deleteTodo, status: statusOpt,
    priority: priorityOpt, labels, updateTodo, getTodoById } = useGlobalContext();
  const navigate = useNavigate();

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


	async function fetchData() {
		const todoId = item._id
    const data = await getTodoById(slug, projectId, todoId);
    setTodoForm(data.data);
	}

	const handleUpdateTodoAPI = async (todo) => {
		const todoId = item._id
    await updateTodo(slug, projectId, todoId, todo);
    await fetchData();
  };


  const menuClassName = ({ state }) =>
    state === "opening"
      ? styles.menuOpening
      : state === "closing"
      ? styles.menuClosing
      : styles.menu;

  const dateFormatter = (date) => {
    const originalDate = new Date(date);

    const formattedDate = originalDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  };

  const goToDetailPage = (id) => {
    navigate(`/${slug}/project/${projectId}/todo/${id}`);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(slug, projectId, id);
    await getTodos(slug, projectId);
  };

  const handleCopyClick = (todoId) => {
    // console.log("TodoTodo", todoId)
  };

  const getStatusItem = (statusId) => {
    switch (statusId) {
      case "1":
        return <FaSignal />;
      case "2":
        return <FaSignal />;
      case "3":
        return <CgSignal />;
      case "4":
        return <CgSignal />;
      case "5":
        return <MdBlockFlipped />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainBoardGridItem}>
      <div className={styles.dragIndicator}>
        <MdDragIndicator />
      </div>
      <div className={styles.checkbox}>
        <MdCheckBoxOutlineBlank />
      </div>
      {/* <MdOutlineCheckBox /> */}
      <div className={styles.priorityBox}>
      <div key={item._id}>
          <PriorityDropdown2 todo={item} onUpdate={handleUpdateTodoAPI} />
        </div>
			</div>

      <div key={item._id}>
					<StatusDropdown2
              todo={item}
              onUpdate={handleUpdateTodoAPI}
            />
			</div>

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
              } else if (index === 3) {
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
        {item.assignee.length > 0 ? (
          item.assignee.map((obj) => {
            if (obj.member.detail.avatar) {
              return (
                <div className={styles.assigneeBoxItem}>
                  <img
                    className={styles.assigneeBoxAvatar}
                    src={obj.member.detail.avatar}
                  />
                </div>
              );
            } else if (obj.member.detail.avatar == "") {
              return (
                <div className={styles.assigneeBoxItem}>
                  <FaUserCircle />
                </div>
              );
            }
          })
        ) : (
          <div className={styles.assigneeBoxItemNone}>
            <FaUserCircle />
          </div>
        )}
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
  );
}

export default MySingleTodoItem;
