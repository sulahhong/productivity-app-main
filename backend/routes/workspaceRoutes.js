const express = require("express");
const router = express.Router();

const {
    getWorkspace,
    setWorkspace,
    updateWorkspace,
    deleteWorkspace, inviteWorkspace, getMembers, joinWorkspace
  } = require("../controllers/workspaceController");

  const {protect} = require('../middleWare/authMiddleware')

router.route("/").get(protect, getWorkspace).post(protect, setWorkspace);
router.route("/:slug").put(protect, updateWorkspace).delete(protect, deleteWorkspace);

router.route("/:slug/invite").post(protect, inviteWorkspace);
router.route("/:slug/members").get(protect, getMembers);
router.route("/:slug/join/:inviteId").post(protect, joinWorkspace);


module.exports = router;