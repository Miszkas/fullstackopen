const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "Bugatti",
    author: "MiszaSm",
    url: "https://www.bugatti.com/",
    likes: 36,
    user: {
      username: "Alex Chen",
      name: "Test User One",
      id: "6a461ac5ded9809d7202dfc0",
    },
    id: "6a5a0204b20225b96d6dcce1",
  },
  {
    title: "Porsche",
    author: "MiszaSm",
    url: "https://www.porsche.com/poland/?cs_redirect=1",
    likes: 38,
    user: {
      username: "Alex Chen",
      name: "Test User One",
      id: "6a461ac5ded9809d7202dfc0",
    },
    id: "6a5cfc37ab3ee886c3182466",
  },
  {
    title: "Audi",
    author: "MiszaSm",
    url: "https://www.audi.com/en",
    likes: 0,
    user: {
      username: "Alex Chen",
      name: "Test User One",
      id: "6a461ac5ded9809d7202dfc0",
    },
    id: "6a5f3e28a7a78866a0762032",
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
