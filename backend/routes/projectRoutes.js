const express = require("express");
const router = express.Router();

const {
    getProject,
    setProject,
    updateProject,
    deleteProject,
  } = require("../controllers/projectController");

  const {protect} = require('../middleWare/authMiddleware')

  router.route("/:slug/project").get(protect, getProject).post(protect, setProject);
  router.route("/:slug/project/:id").put(protect, updateProject).delete(protect, deleteProject);
  
  
  
  module.exports = router;