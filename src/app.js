require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauces");

const userRoutes = require("./routes/user");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(cors());
app.use(express.json()); //receive the response from server.

app.use("/images", express.static(path.join(__dirname, "../public/uploads")));

//Vaidate via token user authentication

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization)
    return res.json({ message: "No token provided" });

  const token = req.headers.authorization.split(" ")[1]; //number 1 indicate the second element of the bearer array

  try {
    const decoded = jwt.verify(token, process.env.Token_Number);

    req.user = { userId: decoded.userId };

    next();
  } catch (ex) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.use("/api/sauces/", [authMiddleware], saucesRoutes);

app.use("/api/auth/", userRoutes);

app.listen(3000, () => console.log("App listening on port 3000"));

module.exports = app;
