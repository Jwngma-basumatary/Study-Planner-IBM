const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  addChapter,
  updateChapter,
  deleteChapter,
  toggleChapter
} = require("../controllers/subjectController");


const router = express.Router();


// All subject routes require login
router.use(protect);


// Subjects
router.get("/", getSubjects);

router.post("/", createSubject);

router.put(
  "/:id",
  updateSubject
);

router.delete(
  "/:id",
  deleteSubject
);


// Chapters
router.post(
  "/:id/chapters",
  addChapter
);

router.put(
  "/:id/chapters/:chapterId",
  updateChapter
);

router.delete(
  "/:id/chapters/:chapterId",
  deleteChapter
);

router.patch(
  "/:id/chapters/:chapterId/toggle",
  toggleChapter
);


module.exports = router;