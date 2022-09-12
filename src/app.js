//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");

const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();

// Connection with mongoDB data base

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
/*
const data = {
  users: [{ id: 1, email: "user@email.com", password: "123456" }],
  sauces: [],
};

// code for sign up

app.post("/api/auth/signup", (req, res) => {
  const user = {
    id: 1,
    ...req.body,
  };

  data.users = [...data.users, user];

  res.status(201).json(user);
});

// code for sign in
app.post("/api/auth/login", (req, res) => {
  const user = data.users.find((u) => u.email === req.body.email);

  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.password !== req.body.password)
    return res.status(401).json({ error: "Password mismatch" });

  res.status(201).json(user);
});*/

app.use(bodyParser.json());

//app.use('/api/sauces', saucesRoutes);

app.use("/api/sauces", saucesRoutes);
//app.use("/api/sauces/:id", saucesRoutes);
app.use("/api/auth/", userRoutes);

app.listen(3000, () => console.log("App listening on port 3000"));

module.exports = app;
