const express = require("express");
const router = express.Router();

const {
  getGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers");

router.get("/", getGoals);

router.get("/:id", getSingleGoal);

router.post("/", createGoal);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

module.exports = router;
