const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

const {errorHandler} = require("./middlewares");
const {goalRoutes, userRoutes} = require("./routes");
const {connectToDB} = require("./configs");

const PORT = process.env.PORT || 5000;
const app = express();

let corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// some middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// logging all incoming requests
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

// If we throw any error in any controller then this middleware will catch and manipulate it.
app.use(errorHandler);

// performing some operations before starting server and being able to accpet any requests
connectToDB(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and listening at port: ${PORT}`.white.bgGreen);
  });
});
