const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const PORT = process.env.PORT || 5000;
const app = express();

const {errorHandler} = require("./middlewares");
const {goalRoutes, userRoutes} = require("./routes");
const {connectToDB} = require("./configs");

// some middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// performing some operations before starting server and being able to accpet any requests
connectToDB();

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

app.listen(PORT, () => {
  console.log(`Server is up and listening at port: ${PORT}`.white.bgGreen);
});
