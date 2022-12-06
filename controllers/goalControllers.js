const asyncHandler = require("express-async-handler");

/*
 * @desc    Get Goals
 * @route   Get /api/goals
 * @access  private
 */
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({message: "Get all goals"});
});

/*
 * @desc    Set Goal
 * @route   POST /api/goals
 * @access  private
 */
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }
});

/*
 * @desc    Get a single goal
 * @route   GET /api/goals/:id
 * @access  private
 */
const getSingleGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Get goal with id ${id}`});
});

/*
 * @desc    Update a single goal
 * @route   PUT /api/goals/:id
 * @access  private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Updated goal with id ${id}`});
});

/*
 * @desc    Delete a single goal
 * @route   delete /api/goals/:id
 * @access  private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Deleted goal with id ${id}`});
});

module.exports = {getGoals, getSingleGoal, createGoal, updateGoal, deleteGoal};
