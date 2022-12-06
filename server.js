const express = require("express");
const {errorHandler} = require("./middlewares");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

const {goalRoutes} = require("./routes");

// some middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// logging all incoming requests
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use("/api/goals", goalRoutes);

// If we throw any error in any controller then this middleware will catch and manipulate it.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and listening at port: ${PORT}`);
});
