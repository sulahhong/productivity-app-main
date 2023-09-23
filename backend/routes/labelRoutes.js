const express = require("express");
const router = express.Router();
const {
  getLabel,
  setLabel,
  updateLabel,
  deleteLabel,
} = require("../controllers/labelController");

const {protect} = require('../middleWare/authMiddleware')

router.route("/:projectId/label").get(protect, getLabel).post(protect, setLabel);
router.route("/:projectId/label/:id").put(protect, updateLabel).delete(protect, deleteLabel);



module.exports = router;
 