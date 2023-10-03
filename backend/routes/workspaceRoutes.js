const express = require("express");
const router = express.Router();

const {
  getCreatedWorkspace,
    setWorkspace,
    updateWorkspace,
    deleteWorkspace, inviteWorkspace, getMembers, joinWorkspace, getJoinedWorkspace
  } = require("../controllers/workspaceController");

  const {protect} = require('../middleWare/authMiddleware')
  const {member} = require('../middleWare/memberMiddleware')
  const {permission} = require('../middleWare/permissionMiddleware')

  const WorkspaceMember = require("../model/workspaceMemberModel");
  const { workspace } = require("../rbac/workspace");


const updateWorkspaceRoles = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER]
const deleteWorkspaceRoles = [ workspace.OWNER]
const inviteWorkspaceRoles = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER]
const getMembersRoles = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER, workspace.GUEST, workspace.VIEWER]

router.route("/").get(protect, getCreatedWorkspace)
router.route("/").post(protect, setWorkspace);
router.route("/joined").get(protect, getJoinedWorkspace);
router.route("/:slug").put(protect, member, permission(updateWorkspaceRoles, []), updateWorkspace)
router.route("/:slug").delete(protect, member, permission(deleteWorkspaceRoles, []), deleteWorkspace)
router.route("/:slug/invite").post(protect, member, permission(inviteWorkspaceRoles, []), inviteWorkspace);
router.route("/:slug/members").get(protect,member, permission(getMembersRoles, []), getMembers);
router.route("/join/:inviteId").post(protect, joinWorkspace);

module.exports = router;