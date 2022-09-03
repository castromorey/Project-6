require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const data = {
  users: [{ id: 1, email: "user@email.com", password: "123456" }],
  sauces: [],
};

app.post("/api/auth/signup", (req, res) => {
  const user = {
    id: 1,
    ...req.body,
  };

  data.users = [...data.users, user];

  res.status(201).json(user);
});

app.post("/api/auth/login", (req, res) => {
  const user = data.users.find((u) => u.email === req.body.email);

  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.password !== req.body.password)
    return res.status(401).json({ error: "Password mismatch" });

  res.status(201).json(user);
});

app.get("/api/sauces", (req, res) => {
  res.json(data.sauces);
});

app.get("/api/sauces/:id", (req, res) => {
  const sauce = data.sauces.find((s) => s.id === req.params.id);

  if (!sauce) return res.status(404).json({ error: "Sauce not found" });

  res.json(sauce);
});

app.post("/api/sauces", (req, res) => {});

app.listen(3000, () => console.log("App listening on port 3000"));
