const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected successfully: ");
  } catch (error) {
    console.log("Db connnection fail: ", error);
  }
};
module.exports = DbConnect;
