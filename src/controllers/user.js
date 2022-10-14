const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "User already added!",
          error: error,
        });
      });
  });
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw Error("User not found!");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) throw Error("Incorrect password!");

    const token = jwt.sign({ userId: user._id }, process.env.Toke_Number); //server key

    res.status(200).json({ userId: user._id, token });
  } catch (ex) {
    res.status(400).json({
      message: ex.message,
    });
  }
};
