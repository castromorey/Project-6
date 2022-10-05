const mongoose = require("mongoose");

const db = async () => {
  return await mongoose.connect(process.env.MONGO_URL);
};
