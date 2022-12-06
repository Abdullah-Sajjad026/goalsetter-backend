const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {User} = require("../models");
const {generateToken} = require("../utils");

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  public
 */
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // checking for an existing user
  const exists = await User.findOne({email});

  if (exists) {
    res.status(400);
    throw new Error("A user is already registered with this email");
  }

  // encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // registering the user in db

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Login a user
 * @route   POST /api/users/login
 * @access  public
 */
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: await generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * @desc    Get a user profile
 * @route   GET /api/users/getMe
 * @access  private
 */
const getMe = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id);

  res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// exporting controllers
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
