const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Todo = require("../model/todoModel");
const User = require("../model/userModel");
const Workspace = require("../model/workspaceModel");
const Project = require("../model/projectModel");
const Label = require("../model/labelModel");
const Priority = require("../model/priorityModel");
const Status = require("../model/statusModel");
const {
  validProject,
  validProjectMember,
} = require("../service/projectService");
const { validWorkspace } = require("../service/workspaceService");
const {
  PrioritySidToObj,
  StatusSidToObj,
  verifyLabel,
  validTodo,
} = require("../service/todoService");
const { PRIORITY, STATUS } = require("../model/code");

const getTodos = asyncHandler(async (req, res) => {
  console.log("PROJ", req.projectMember)
  console.log("WR", req.workspaceMember)

  const project = await validProject(res, req.params.projectId);

  const todos = await Todo.find({ project: project._id }).populate([
    { path: "createdBy", select: "-password -createdAt -updatedAt -__v" },
    { path: "project", select: "_id title description workspace" },
    { path: "priority", select: "-_id sid title " },
    { path: "status", select: "-_id sid title " },
    { path: "label", select: "name color" },
    { path: "workspace", select: "name slug" },
  ]);
  res.status(200).json(todos);
});

const getTodoById = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);
  const project = await validProject(res, req.params.projectId);

  if (!mongoose.Types.ObjectId.isValid(req.params.todoId)) {
    res.status(400);
    throw new Error("todo id invalid");
  }
  const todo = await Todo.findById(req.params.todoId).populate([
    { path: "createdBy", select: "-password -createdAt -updatedAt -__v" },
    { path: "project", select: "_id title description workspace" },
    { path: "priority", select: "-_id sid title " },
    { path: "status", select: "-_id sid title " },
    { path: "label", select: "name color" },
    { path: "workspace", select: "name slug" },
  ]);

  if (!todo) {
    res.status(400);
    throw new Error("todo not found");
  }

  res.status(200).json(todo);
});

const setTodo = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);
  const project = await validProject(res, req.params.projectId);

  if (!req.body.title) {
    res.status(400);
    throw new Error("please add a title field");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("please add a description field");
  }
  if (!req.body.priority) {
    res.status(400);
    throw new Error("please add a priority field");
  }
  if (!req.body.status) {
    res.status(400);
    throw new Error("please add a status field");
  }
  if (!req.body.label) {
    res.status(400);
    throw new Error("please add a label field (array)");
  }

  //get priority + status
  // const priority = await PrioritySidToObj(res, req.body.priority);
  // const status = await StatusSidToObj(res, req.body.status);
  if(!PRIORITY.hasOwnProperty(req.body.priority)){
    res.status(400);
    throw new Error("invalid priority");
  }

  if(!STATUS.hasOwnProperty(req.body.status)){
    res.status(400);
    throw new Error("invalid status");
  }

  // 라벨 확인
  // project 의 라밸 만
  let verifiedLabels = await verifyLabel(res, req.body.label, project._id);

  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    doneYn: false,
    dueDate: req.body.dueDate,
    project: project,
    priority: PRIORITY[req.body.priority],
    status: STATUS[req.body.status],
    label: verifiedLabels,
    workspace: workspace._id,
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  // const todo = await Todo.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   doneYn: false,
  //   dueDate: req.body.dueDate,
  //   project: project,
  //   priority: priority._id,
  //   status: status._id,
  //   label: verifiedLabels,
  //   workspace: workspace._id,
  //   createdBy: req.user.id,
  //   updatedBy: req.user.id,
  // });

  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);
  const project = await validProject(res, req.params.projectId);

  const todo = await validTodo(res, req.params.todoId);

  console.log("UPDATE", req.body)
  //important, same as setTodo!
  if (!req.body.title) {
    res.status(400);
    throw new Error("please add a title field");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("please add a description field");
  }
  if (!req.body.priority) {
    res.status(400);
    throw new Error("please add a priority field");
  }
  if (!req.body.status) {
    res.status(400);
    throw new Error("please add a status field");
  }

  if(!PRIORITY.hasOwnProperty(req.body.priority)){
    res.status(400);
    throw new Error("invalid priority");
  }

  if(!STATUS.hasOwnProperty(req.body.status)){
    res.status(400);
    throw new Error("invalid status");
  }

  let verifiedLabels = await verifyLabel(res, req.body.label, project._id);

  const updateData = {
    title: req.body.title,
    description: req.body.description,
    // doneYn: false,
    dueDate: req.body.dueDate,
    // project: project,
    priority: PRIORITY[req.body.priority],
    status: STATUS[req.body.status],
    label: verifiedLabels,
    // workspace: workspace,
    // createdBy: req.user.id,
    updatedBy: req.user.id,
  };

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoId, updateData, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);
  const project = await validProject(res, req.params.projectId);

  const todo = await validTodo(res, req.params.todoId);
  await todo.deleteOne();

  res.status(200).json({ status: "delete success", id: req.params.todoId });
});

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
};
