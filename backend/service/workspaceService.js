const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Todo = require("../model/todoModel");
const User = require("../model/userModel");
const Workspace = require("../model/workspaceModel");
const WorkspaceMember = require("../model/workspaceMemberModel");


const validWorkspace = asyncHandler(async (res, slug) => {
    const workspace = await Workspace.findOne({ slug: slug })

    if (!workspace) {
        res.status(400)
        throw new Error('workspace not Found')
    }
    return workspace
})

const validWorkspaceMember = asyncHandler(async (res, workspaceId,userId) => {
    const workspaceMember = await WorkspaceMember.findOne({ member: userId, workspace: workspaceId });
    if (!workspaceMember) {
      res.status(400);
      throw new Error("Actor not workspace member");
    }
  });

  const workspaceMembers = asyncHandler(async (res, workspaceId) => {
    const workspaceMember = await WorkspaceMember.find({ workspace: workspaceId }).populate([
        { path: "createdBy", select: "-password -createdAt -updatedAt -__v" },
        { path: "workspace", select: "name slug" },
        { path: "member", select: "-password -createdAt -updatedAt -__v" },
        { path: "role" },
      ]);
    if (workspaceMember.length<1) {
      res.status(400);
      throw new Error("no members in this workspace");
    }
    return workspaceMember
  });


  const getWorkspaceMemberFromList = asyncHandler(async(res, workspaceMembers, workspaceId)=>{
    let verifiedWorkspaceMember = []
    
    for(let workspaceMemberId of workspaceMembers){
      const workspaceMember = await WorkspaceMember.findOne({_id: workspaceMemberId, workspace:workspaceId})
      if(!workspaceMember){
        res.status(400);
      throw new Error(`${workspaceMemberId}`+"is not a valid user");
      }
      verifiedWorkspaceMember.push(workspaceMember)
    }

    return verifiedWorkspaceMember;
  })

  const getRoleFromUser= asyncHandler(async (res, workspaceId, userId) => {
    const workspaceMember = await WorkspaceMember.findOne({member: userId, workspace: workspaceId }).populate({path: "role"})
    if(!workspaceMember){
      res.status(400);
      throw new Error("not a valid workspaceMember");
    }
    return workspaceMember.role.sid
  })

module.exports = {
    validWorkspace, validWorkspaceMember, workspaceMembers, getWorkspaceMemberFromList, getRoleFromUser
  };