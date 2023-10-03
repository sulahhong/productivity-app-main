const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Todo = require("../model/todoModel");
const User = require("../model/userModel");
const Workspace = require("../model/workspaceModel");
const WorkspaceMember = require("../model/workspaceMemberModel");
const Project = require('../model/projectModel')
const ProjectMember = require('../model/projectMemberModel')
const Label = require("../model/labelModel");
const Priority = require("../model/priorityModel");
const Status = require("../model/statusModel");

const validTodo = asyncHandler(async(res, todoId)=>{
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        res.status(400);
        throw new Error("todo Id invalid");
      }
    const todo = await Todo.findById(todoId)
    if (!todo) {
        res.status(400)
        throw new Error('todo not Found')
    }
    return todo
})

const PrioritySidToObj = asyncHandler(async(res, sid)=>{
  const priority = await Priority.findOne({ sid: sid });
  if (!priority) {
    res.status(400);
    throw new Error("invalid priority");
  }
  return priority
})

const StatusSidToObj = asyncHandler(async(res, sid)=>{
    const status = await Status.findOne({ sid: sid });
    if (!status) {
      res.status(400);
      throw new Error("invalid status");
    }
    return status
  })

  const verifyLabel = asyncHandler(async(res, labelIds, projectId)=>{
    for (let labelId of labelIds){
        if (!mongoose.Types.ObjectId.isValid(labelId)) {
          res.status(400);
          throw new Error("label Id invalid");
        }
      }

    let verifiedLabels = []
    if(labelIds.length>0){
      verifiedLabels = await Label.find({ _id: { $in: labelIds}, project: projectId})
      console.log("LABEL", verifiedLabels)
    }
    if(verifiedLabels.length != labelIds.length){
        res.status(400);
        throw new Error("invalid label");
      }
    
      return verifiedLabels;
  })

module.exports = {
    validTodo, PrioritySidToObj, StatusSidToObj, verifyLabel
  };