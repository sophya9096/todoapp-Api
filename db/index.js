const mongoose = require("mongoose");

const {config} = require("../config")

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI),
      { useNewUrlParser: true, useUnifiedTopology: true, useCreacteIndex: true };
    console.log("Mongo Db connected sucessfully!");
  } catch (error) {
    console.log(`Unable to connect database: ${error.message}`);
  }
};