const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const WorkspaceMember = require("../model/workspaceMemberModel");
const Project = require('../model/projectModel')
const Workspace = require("../model/workspaceModel");
const ProjectMember = require('../model/projectMemberModel')

const permission = (workspaceRoles, projectRoles) => asyncHandler(async (req, res, next) => {
console.log("workspaceRoles", workspaceRoles)
console.log("projectRoles", projectRoles)
console.log("workspaceRole", req.workspaceRole)
console.log("projectRole",req.projectRole)

if((workspaceRoles.length && workspaceRoles.includes(req.workspaceRole)) || (projectRoles.length && projectRoles.includes(req.projectRole))){
    console.log("ETSTER1", workspaceRoles.length && workspaceRoles.includes(req.workspaceRole))

    console.log("ETSTER2", projectRoles.length && projectRoles.includes(req.projectRole))
    next();
}else{
    res.status(400)
            throw new Error('Current user has no permission for this request')
}
})

module.exports = { permission };