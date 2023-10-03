const express = require("express");
const router = express.Router();
const {
  getLabel,
  setLabel,
  updateLabel,
  deleteLabel, getWorkspaceLabel
} = require("../controllers/labelController");

const {protect} = require('../middleWare/authMiddleware')
const {member} = require('../middleWare/memberMiddleware')
const {permission} = require('../middleWare/permissionMiddleware')

const { workspace } = require("../rbac/workspace");
const { project } = require("../rbac/project");

const getWorkspaceLabelACW = [ workspace.OWNER, workspace.ADMIN, workspace.MEMBER, workspace.GUEST, workspace.VIEWER]
const getLabelACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const setLabelACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const updateLabelACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const deleteLabelACP = [ project.OWNER, project.ADMIN, project.MEMBER]

router.route("/:slug/label").get(protect, member, permission(getWorkspaceLabelACW, []), getWorkspaceLabel)
router.route("/:slug/project/:projectId/label").get(protect, member, permission([], getLabelACP), getLabel)
router.route("/:slug/project/:projectId/label").post(protect, member, permission([], setLabelACP), setLabel);
router.route("/:slug/project/:projectId/label/:labelId").put(protect, member, permission([], updateLabelACP), updateLabel)
router.route("/:slug/project/:projectId/label/:labelId").delete(protect, member, permission([], deleteLabelACP), deleteLabel);

module.exports = router;
