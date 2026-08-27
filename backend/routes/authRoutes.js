const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected route
// The JWT middleware identifies the logged-in user.
router.get("/profile", protect, getProfile);


module.exports = router;