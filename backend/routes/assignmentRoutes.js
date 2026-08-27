const express = require("express");

const protect =
  require("../middleware/authMiddleware");


const {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  toggleAssignment
} =
  require("../controllers/assignmentController");


const router =
  express.Router();


// ========================================
// ALL ASSIGNMENT ROUTES REQUIRE LOGIN
// ========================================

router.use(protect);


// GET
router.get(
  "/",
  getAssignments
);


// CREATE
router.post(
  "/",
  createAssignment
);


// UPDATE
router.put(
  "/:id",
  updateAssignment
);


// DELETE
router.delete(
  "/:id",
  deleteAssignment
);


// TOGGLE
router.patch(
  "/:id/toggle",
  toggleAssignment
);


module.exports = router;