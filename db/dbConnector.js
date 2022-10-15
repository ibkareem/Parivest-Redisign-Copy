const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.ATLAS_URL, connectionCallback);
};

function connectionCallback(err) {
  if (err) console.error("cannot connect to mongoDb");
  else console.log("connected to mongoDB Atlas successfully");
}

module.exports = { connectDB };