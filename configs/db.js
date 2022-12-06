const mongoose = require("mongoose");

const connectToDB = async (startListening) => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log(
      `Connected to DB. ${conn.connection.host}`.bgCyan.black.underline
    );
    startListening();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
