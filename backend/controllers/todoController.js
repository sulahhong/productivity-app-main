const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Todo = require("../model/todoModel");
const User = require("../model/userModel");
const Workspace = require("../model/workspaceModel");

const Project = require("../model/projectModel");
const Label = require("../model/labelModel");
const Priority = require("../model/priorityModel");
const Status = require("../model/statusModel");

const getTodos = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    res.status(400);
    throw new Error("prroject Id invalid");
  }

  const project = await Project.findById(req.params.projectId);
  if (!project) {
    res.status(400);
    throw new Error("prroject invalid");
  }

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

const getTodoDetail = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("todo id invalid");
      }
    const todo = await Todo.findById(req.params.id).populate([
        { path: "createdBy", select: "-password -createdAt -updatedAt -__v" },
        { path: "project", select: "_id title description workspace" },
        { path: "priority", select: "-_id sid title " },
        { path: "status", select: "-_id sid title " },
        { path: "label", select: "name color" },
        { path: "workspace", select: "name slug" },
      ])
    console.log("Check todo:" , todo)

    if (!todo) {
        res.status(400);
    throw new Error("todo not found");
    }

    res.status(200).json(todo);
})

const setTodo = asyncHandler(async (req, res) => {
  console.log("CHEK SLUG & PROJECT :", req.body);
  const workspace = await Workspace.findOne({ slug: req.params.slug });
  if (!workspace) {
    res.status(400);
    throw new Error("Workspace invalid");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    res.status(400);
    throw new Error("prroject Id invalid");
  }

  const project = await Project.findById(req.params.projectId);
  if (!project) {
    res.status(400);
    throw new Error("prroject invalid");
  }

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

  //get priority
  const priority = await Priority.find({ sid: req.body.priority });
  let priorityId = priority[0]._id;
  console.log("priority: ", priorityId);

  if ((priority.length = 0)) {
    res.status(400);
    throw new Error("invalid priority");
  }

  const status = await Status.find({ sid: req.body.status });

  let statusId = status[0]._id;
  console.log("status: ", statusId);
  if ((status.length = 0)) {
    res.status(400);
    throw new Error("invalid status");
  }

  console.log("USER: ", req.user.id);
  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    doneYn: false,
    dueDate: req.body.dueDate,
    project: project,
    priority: priorityId,
    status: statusId,
    label: req.body.label,
    workspace: workspace,
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not Found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (todo.createdBy.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

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

  //get priority
  const priority = await Priority.find({ sid: req.body.priority });
  let priorityId = priority[0]._id;
  console.log("priority: ", priorityId);

  if ((priority.length = 0)) {
    res.status(400);
    throw new Error("invalid priority");
  }

  const status = await Status.find({ sid: req.body.status });

  let statusId = status[0]._id;
  console.log("status: ", statusId);
  if ((status.length = 0)) {
    res.status(400);
    throw new Error("invalid status");
  }

  const updateData={
    title: req.body.title,
    description: req.body.description,
    // doneYn: false,
    dueDate: req.body.dueDate,
    // project: project,
    priority: priorityId,
    status: statusId,
    label: req.body.label,
    // workspace: workspace,
    // createdBy: req.user.id,
    updatedBy: req.user.id,
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not Found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (todo.createdBy.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await todo.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  getTodoDetail,
};
