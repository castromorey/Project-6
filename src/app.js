require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
//const db = require("../lib/db");

const saucesRoutes = require("./routes/sauces");

const userRoutes = require("./routes/user");

const path = require("path");
const multer = require("multer");
const fs = require("fs");

//const images = multer({ dest: "/images" });

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "../public/uploads"),
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const app = express();

/*app.use(
  multer({ dest: path.join(__dirname, "public/uploads") }).single("image")
);*/

//app.use(express.static(path.join(__dirname, "public")));

// Connection with mongoDB data base

//mongoose.connect(process.env.Mongo_DB);

mongoose
  .connect(
    "mongodb+srv://castromorey:Carl0$-MongoDB@cluster0.xjhywfi.mongodb.net/?retryWrites=true&w=majority"
  )
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

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization)
    return res.json({ message: "No token provided" });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "s3cretttt");

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
