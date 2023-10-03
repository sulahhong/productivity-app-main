const express = require("express");
const router = express.Router();

const {
  getWorkspaceProject,
    setProject,
    updateProject,
    deleteProject, inviteProject, getMembers, getJoinedProject, joinProject, approveJoinRequest
  } = require("../controllers/projectController");

  const {protect} = require('../middleWare/authMiddleware')
  const {member} = require('../middleWare/memberMiddleware')
  const {permission} = require('../middleWare/permissionMiddleware')

  const { workspace } = require("../rbac/workspace");
const { project } = require("../rbac/project");

const getWorkspaceProjectRoles = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER, workspace.GUEST, workspace.VIEWER]
const setProjectRoles = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER]


const updDel_WR = [ workspace.OWNER, workspace.ADMIN]
const updDel_PR = [ project.OWNER, project.ADMIN]

const WR1 = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER, workspace.GUEST, workspace.VIEWER]
const PR1 = [ project.OWNER, project.ADMIN]

  router.route("/:slug/project").get(protect, member, permission(getWorkspaceProjectRoles, []), getWorkspaceProject)
  router.route("/:slug/project").post(protect, member, permission(setProjectRoles, []), setProject);
  router.route("/:slug/project/joined").get(protect, getJoinedProject)//gg need slug?? for no workspace member
  router.route("/:slug/project/:projectId").put(protect, member, permission(updDel_WR, updDel_PR),updateProject)
  router.route("/:slug/project/:projectId").delete(protect, member, permission(updDel_WR, updDel_PR),deleteProject);
  
  router.route("/:slug/project/:projectId/invite").post(protect,member, permission(updDel_WR, updDel_PR), inviteProject);
  router.route("/:slug/project/:projectId/join").post(protect, member, permission(WR1, []), joinProject)
  router.route("/:slug/project/:projectId/members").get(protect, member, permission(WR1, PR1), getMembers);

  router.route("/:slug/project/:projectId/approve/:joinRequestId").post(protect, member, permission(updDel_WR, PR1), approveJoinRequest);

  
  module.exports = router;