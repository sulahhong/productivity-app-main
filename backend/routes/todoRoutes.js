const express = require("express");
const router = express.Router();
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  getTodoDetail,
} = require("../controllers/todoController");

const {protect} = require('../middleWare/authMiddleware')

router.route("/:slug/project/:projectId/todos").get(protect, getTodos).post(protect, setTodo);
router.route("/:slug/project/:projectId/todos/:id").put(protect, updateTodo).delete(protect, deleteTodo).get(protect, getTodoDetail);

// router.get('/', getTodos)

// router.post('/', setTodo)

// router.put('/:id', updateTodo)

// router.delete('/:id', deleteTodo)

module.exports = router;
