const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const WorkspaceMember = require("../model/workspaceMemberModel");
const Project = require('../model/projectModel')
const Workspace = require("../model/workspaceModel");
const ProjectMember = require('../model/projectMemberModel')

const member = asyncHandler(async (req, res, next) => {

    if(req.params.slug){
      const workspace = await Workspace.findOne({ slug: req.params.slug })
      if (!workspace) {
        res.status(400)
        throw new Error('workspace not Found')
    }
    const workspaceMember = await WorkspaceMember.findOne({member: req.user.id, workspace: workspace._id }).populate({path: "role"})
    if (workspaceMember){
        req.workspaceMember = workspaceMember
        req.workspaceRole = workspaceMember.role
    }
    }

    if(req.params.projectId){
        const project = await Project.findById(req.params.projectId)

        if (!project) {
            res.status(400)
            throw new Error('project not Found')
        }

    const projectMember = await ProjectMember.findOne({member: req.user.id, project: req.params.projectId }).populate({path: "role"})
    if (projectMember){
        req.projectMember = projectMember
        req.projectRole = projectMember.role
    }
    }
    next();
})

module.exports = { member };