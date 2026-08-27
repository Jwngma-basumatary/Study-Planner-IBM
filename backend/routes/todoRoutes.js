const express = require("express");

const protect =
  require("../middleware/authMiddleware");


const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} =
  require("../controllers/todoController");


const router =
  express.Router();


// All Todo routes require login
router.use(protect);


// GET
router.get(
  "/",
  getTodos
);


// CREATE
router.post(
  "/",
  createTodo
);


// UPDATE
router.put(
  "/:id",
  updateTodo
);


// DELETE
router.delete(
  "/:id",
  deleteTodo
);


// TOGGLE
router.patch(
  "/:id/toggle",
  toggleTodo
);


module.exports = router;