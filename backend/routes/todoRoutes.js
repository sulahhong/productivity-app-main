const express = require("express");
const router = express.Router();
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("../controllers/todoController");

const {protect} = require('../middleWare/authMiddleware')
const {member} = require('../middleWare/memberMiddleware')
const {permission} = require('../middleWare/permissionMiddleware')

const { workspace } = require("../rbac/workspace");
const { project } = require("../rbac/project");

const getTodosACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const setTodosACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const updateTodosACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const deleteTodosACP = [ project.OWNER, project.ADMIN, project.MEMBER]
const getTodoByIdACP = [ project.OWNER, project.ADMIN, project.MEMBER]

router.route("/:slug/project/:projectId/todo").get(protect, member, permission([], getTodosACP), getTodos)
router.route("/:slug/project/:projectId/todo").post(protect, member, permission([], setTodosACP), setTodo);
router.route("/:slug/project/:projectId/todo/:todoId").put(protect, member, permission([], updateTodosACP), updateTodo)
router.route("/:slug/project/:projectId/todo/:todoId").delete(protect, member, permission([], deleteTodosACP), deleteTodo)
router.route("/:slug/project/:projectId/todo/:todoId").get(protect, member, permission([], getTodoByIdACP),getTodoById);

module.exports = router;
