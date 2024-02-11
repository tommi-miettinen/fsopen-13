import User from "./User.js";
import Blog from "./Blog.js";

Blog.sync();
User.sync();

export { User, Blog };
