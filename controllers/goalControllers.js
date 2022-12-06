const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const {Goal} = require("../models");

/*
 * @desc    Get Goals
 * @route   Get /api/goals
 * @access  private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({message: "Fetched Successfully", goals});
});

/*
 * @desc    Set Goal
 * @route   POST /api/goals
 * @access  private
 */
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json({message: "Goal created successfully", goal});
});

/*
 * @desc    Get a single goal
 * @route   GET /api/goals/:id
 * @access  private
 */
const getSingleGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (mongoose.isValidObjectId(id)) {
    const goal = await Goal.findById(id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    res.status(200).json({message: `Fetched goal successfully`, goal});
  } else {
    res.status(400);
    throw new Error("Given id for the goal is not correct");
  }
});

/*
 * @desc    Update a single goal
 * @route   PUT /api/goals/:id
 * @access  private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (mongoose.isValidObjectId(id)) {
    const goal = await Goal.findById(id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {new: true});
    res
      .status(200)
      .json({message: "Goal updated successfully", goal: updatedGoal});
  } else {
    res.status(400);
    throw new Error("Given id for goal is not correct");
  }
});

/*
 * @desc    Delete a single goal
 * @route   delete /api/goals/:id
 * @access  private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (mongoose.isValidObjectId(id)) {
    const result = await Goal.findByIdAndDelete(id);

    if (!result) {
      res.status(400);
      throw new Error("No goal exists with the given id");
    }

    res.status(200).json({message: "Goal deleted successfully", id});
  } else {
    res.status(400);
    throw new Error("Given id for the goal is not correct");
  }
});

module.exports = {getGoals, getSingleGoal, createGoal, updateGoal, deleteGoal};
