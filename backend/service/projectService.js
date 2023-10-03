const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Todo = require("../model/todoModel");
const User = require("../model/userModel");
const Workspace = require("../model/workspaceModel");
const WorkspaceMember = require("../model/workspaceMemberModel");
const Project = require('../model/projectModel')
const ProjectMember = require('../model/projectMemberModel')


const validProject = asyncHandler(async(res, projectId)=>{

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400);
        throw new Error("prroject Id invalid");
      }

    const project = await Project.findById(projectId)

    if (!project) {
        res.status(400)
        throw new Error('project not Found')
    }
    return project
})

const validProjectMember = asyncHandler(async(res, projectId, userId)=>{
    const projectMember = await ProjectMember.findOne({member: userId, project: projectId })

    if (!projectMember) {
        res.status(400)
        throw new Error('Not project member')
    }
    
})

const projectMembers = asyncHandler(async (res, projectId) => {
    const projectMember = await ProjectMember.find({ project: projectId }).populate([
        { path: "createdBy", select: "-password -createdAt -updatedAt -__v" },
        { path: "workspace", select: "name slug" },
        { path: "member", select: "-password -createdAt -updatedAt -__v" },
      ]);
  
    return projectMember
  });


  const isProjectMember = asyncHandler(async (userId, projectId) => {
    const projectMember = await ProjectMember.findOne({member: userId, project: projectId})
    if (projectMember){
        return true
    }else{
        return false
  }}
  )

  const getProjectRoleFromUser= asyncHandler(async ( projectId, userId) => {
    const projectMember = await ProjectMember.findOne({member: userId, project: projectId }).populate({path: "role"})
    return projectMember.role.sid
  })

  const getWorkspaceRoleFromUser= asyncHandler(async ( workspaceId, userId) => {
    const workspaceMember = await WorkspaceMember.findOne({member: userId, workspace: workspaceId }).populate({path: "role"})
    return workspaceMember.role.sid
  })

module.exports = {
    validProject, validProjectMember, projectMembers, isProjectMember,
    getProjectRoleFromUser, getWorkspaceRoleFromUser
  };