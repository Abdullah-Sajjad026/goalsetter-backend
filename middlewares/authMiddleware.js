const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {User} = require("../models");

const protect = asyncHandler(async (req, res, next) => {
  // declaring a token variable which will be assigned a token if Authorization header contains correct token.
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // setting a user property on each protected route's request
    req.user = await User.findById(decoded).select("-password");

    // forwarding the request to controller.
    next();
  } else {
    res.status(401);
    throw new Error("Invalid auth header");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});

module.exports = protect;
