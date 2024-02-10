import express from "express";
import Blog from "./Blog.js";
import User from "./User.js";
import { Op } from "sequelize";
const app = express();
app.use(express.json());
app.get("/api/blogs", async (req, res) => {
    if (req.query.search) {
        const blogs = await Blog.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.search}%`,
                },
            },
            order: [["createdAt", "DESC"]],
        });
        res.json(blogs);
    }
    else {
        const blogs = await Blog.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.json(blogs);
    }
});
app.post("/api/blogs", async (req, res) => {
    try {
        const { author, url, title, likes } = req.body;
        const newBlog = await Blog.create({ author, url, title, likes });
        res.status(201).json(newBlog);
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.delete("/api/blogs/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.destroy({ where: { id } });
        if (deletedBlog) {
            res.status(204).end();
        }
        else {
            res.status(404).json({ error: "Blog not found" });
        }
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.put("/api/blogs/:id", async (req, res) => {
    const { id } = req.params;
    const { author, url, title, likes } = req.body;
    try {
        const updatedBlog = await Blog.update({ author, url, title, likes }, { where: { id }, returning: true });
        if (updatedBlog[0]) {
            res.json(updatedBlog[1][0]);
        }
        else {
            res.status(404).json({ error: "Blog not found" });
        }
    }
    catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/api/users", async (req, res) => {
    const { name, username } = req.body;
    const newUser = await User.create({ name, username });
    res.status(201).json(newUser);
});
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
