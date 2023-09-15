const express = require("express");
const router = express.Router();
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const {protect} = require('../middleWare/authMiddleware')

router.route("/").get(protect, getTodos).post(protect, setTodo);
router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

// router.get('/', getTodos)

// router.post('/', setTodo)

// router.put('/:id', updateTodo)

// router.delete('/:id', deleteTodo)

module.exports = router;
