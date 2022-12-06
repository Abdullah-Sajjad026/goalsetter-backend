const express = require("express");
const router = express.Router();

const {
  getGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers");

const {protect} = require("../middlewares");

router.get("/", protect, getGoals);

router.get("/:id", protect, getSingleGoal);

router.post("/", protect, createGoal);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
