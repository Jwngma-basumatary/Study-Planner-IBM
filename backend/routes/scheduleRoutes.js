const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  toggleSchedule
} = require("../controllers/scheduleController");


const router = express.Router();


// All schedule routes require authentication
router.use(protect);


// GET schedules
// Optional:
// /api/schedules?date=2026-08-27
router.get(
  "/",
  getSchedules
);


// CREATE
router.post(
  "/",
  createSchedule
);


// UPDATE
router.put(
  "/:id",
  updateSchedule
);


// DELETE
router.delete(
  "/:id",
  deleteSchedule
);


// TOGGLE COMPLETED
router.patch(
  "/:id/toggle",
  toggleSchedule
);


module.exports = router;