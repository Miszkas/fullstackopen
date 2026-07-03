const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: "username and password are required" });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "username and password must be at least 3 characters long",
    });
  }

  const user = new User({
    username: username,
    passwordHash: await bcrypt.hash(password, 10),
    name: name,
    blogs: [],
  });

  const newUser = await user.save();
  response.status(201).json(newUser);
});

module.exports = usersRouter;
