const express = require("express");
const router = express.Router();

const {registerUser, loginUser, getMe} = require("../controllers");
const {protect} = require("../middlewares");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);

module.exports = router;
