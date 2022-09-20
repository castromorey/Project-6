const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  _Id: { type: String },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },

  /*usersLiked: [{ type: String, require: true }],
  usersDisliked: [{ type: String, require: true }],*/
});

module.exports = mongoose.model("Sauce", sauceSchema);
