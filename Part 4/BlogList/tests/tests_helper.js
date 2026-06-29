const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "The Future of AI: What to Expect in 2026",
    author: "Alex Chen",
    url: "https://techbytes.com/future-of-ai-2026",
    likes: 342,
  },
  {
    title: "Hidden Gems: 10 Days in Kyoto",
    author: "Sarah Jenkins",
    url: "https://wanderlustblog.com/kyoto-hidden-gems",
    likes: 1205,
  },
  {
    title: "Mastering Mongoose Validation",
    author: "Carlos Rodriguez",
    url: "https://codecrafted.dev/mastering-mongoose-validation",
    likes: 89,
  },
];

const initialUsers = [
  {
    username: "Alex Chen",
    passwordHash: bcrypt.hashSync("password123", 10),
    name: "Test User One",
  },
  {
    username: "Sarah Jenkins",
    passwordHash: bcrypt.hashSync("password456", 10),
    name: "Test User Two",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
};
