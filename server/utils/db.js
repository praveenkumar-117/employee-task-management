const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const dbConect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Failed");
    process.exit(0);
  }
};

module.exports = dbConect;
