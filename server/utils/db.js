const mongoose = require("mongoose");

const URI=process.env.MONGO_URI
// mongoose.connect(URI)

const dbConect = async()=>{
  await mongoose.connect(URI)
  try {
    await mongoose.connect(URI)
    console.log("Database Connected")
  } catch (error) {
    console.log("Database Connection Failed");
    process.exit(0);
  }

}

module.exports = dbConect;