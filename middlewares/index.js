const errorHandler = require("./errorMiddleware.js");
const protect = require("./authMiddleware");

module.exports = {
  errorHandler,
  protect,
};
