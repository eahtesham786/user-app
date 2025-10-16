const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  profileDashboard,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const User = require("../models/user.model");

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", auth, profileDashboard);

module.exports = router;
