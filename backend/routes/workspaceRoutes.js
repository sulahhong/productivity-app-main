const express = require("express");
const router = express.Router();

const {
    getWorkspace,
    setWorkspace,
    updateWorkspace,
    deleteWorkspace,
  } = require("../controllers/workspaceController");

  const {protect} = require('../middleWare/authMiddleware')

router.route("/").get(protect, getWorkspace).post(protect, setWorkspace);
router.route("/:id").put(protect, updateWorkspace).delete(protect, deleteWorkspace);



module.exports = router;