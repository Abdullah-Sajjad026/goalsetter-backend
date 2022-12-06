const {
  getGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("./goalControllers");

const {registerUser, loginUser, getMe} = require("./userControllers");

module.exports = {
  // goal controllers
  getGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,

  // user controllers
  registerUser,
  loginUser,
  getMe,
};
