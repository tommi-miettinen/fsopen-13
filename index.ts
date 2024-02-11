import express from "express";
import "express-async-errors";
import { User, Blog } from "./models/index.js";
import { Sequelize, Op } from "sequelize";

const app = express();

app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  let where = {};
  if (req.query.search) {
    const search = (req.query.search as string).toLowerCase();
    where = {
      [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { author: { [Op.like]: `%${search}%` } }],
    };
  }

  const blogs = await Blog.findAll({
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const { author, url, title, likes } = req.body;
  const newBlog = await Blog.create({ author, url, title, likes });
  res.status(201).json(newBlog);
});

app.get("/api/authors", async (req, res) => {
  const authorsStats = await Blog.findAll({
    attributes: [
      "author",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "articles"],
      [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [[Sequelize.fn("SUM", Sequelize.col("likes")), "DESC"]],
  });
  res.json(authorsStats);
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await Blog.destroy({ where: { id } });
  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { author, url, title, likes } = req.body;

  const updatedBlog = await Blog.update({ author, url, title, likes }, { where: { id }, returning: true });
  if (updatedBlog[0]) {
    res.json(updatedBlog[1][0]);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, username } = req.body;
  const newUser = await User.create({ name, username });
  res.status(201).json(newUser);
});

app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.put("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const { newUsername } = req.body;
  const user = await User.update({ username: newUsername }, { where: { username: username } });
  return res.json(user);
});

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err, "this is the error");
  res.status(statusCode).json({ error: err.message });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
