const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./tests_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs have an id property defined", async () => {
  const response = await api.get("/api/blogs");
  assert(response.body[0].id !== undefined);
});

test("valid blog can be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://test.com",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  assert.strictEqual(blogs.body.length, helper.initialBlogs.length + 1);

  const titles = blogs.body.map((blog) => blog.title);
  assert.strictEqual(titles.includes("Test Blog"), true);
});

test("undefined likes are equal 0 in db", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://test.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  const blogToCheck = blogs.body.find((blog) => blog.title === newBlog.title);
  assert.strictEqual(blogToCheck.likes, 0);
});

test("blog without title cannot be added", async () => {
  const newBlog = {
    author: "Test Author",
    url: "https://test.com",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("blog without url cannot be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("blog can be deleted", async () => {
  const blogs = await api.get("/api/blogs");
  const idToDelete = blogs.body[0].id;

  await api.delete(`/api/blogs/${idToDelete}`).expect(204);

  const blogsAfterDelete = await api.get("/api/blogs");
  assert.strictEqual(
    blogsAfterDelete.body.length,
    helper.initialBlogs.length - 1,
  );

  const ids = blogsAfterDelete.body.map((blog) => blog.id);
  assert.strictEqual(ids.includes(idToDelete), false);
});

test("blog can be updated", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToUpdate = blogs.body[0];

  const updatedBlog = {
    title: "The Future of AI: What to Expect in 2026",
    author: "Alex Chen",
    url: "https://techbytes.com/future-of-ai-2026",
    likes: 1234567,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog);

  const newBlogs = await api.get("/api/blogs");
  const blogToCheck = newBlogs.body.find((b) => b.id === blogToUpdate.id);

  assert.strictEqual(updatedBlog.likes, blogToCheck.likes);
});

describe("users testing", () => {
  test("user can be created", async () => {
    const newUser = {
      username: "testuser",
      password: "testpassword",
      name: "Test User",
    };

    const usersBefore = await api.get("/api/users");

    await api.post("/api/users").send(newUser).expect(201);

    const usersAfter = await api.get("/api/users");
    assert.strictEqual(usersAfter.body.length, usersBefore.body.length + 1);

    const usernames = usersAfter.body.map((user) => user.username);
    assert.strictEqual(usernames.includes(newUser.username), true);
  });

  test("user cannot be created with short username or password", async () => {
    const newInvalidUser = {
      username: "ab",
      password: "12",
      name: "Invalid User",
    };

    const usersBefore = await api.get("/api/users");

    await api.post("/api/users").send(newInvalidUser).expect(400);

    const usersAfter = await api.get("/api/users");
    assert.strictEqual(usersAfter.body.length, usersBefore.body.length);

    const usernames = usersAfter.body.map((user) => user.username);
    assert.strictEqual(usernames.includes(newInvalidUser.username), false);
  });

  test("user without unique username cannot be created", async () => {
    const newUser = {
      username: "Alex Chen",
      password: "anotherpassword",
      name: "Another User",
    };

    const usersBefore = await api.get("/api/users");

    await api.post("/api/users").send(newUser).expect(400);

    const usersAfter = await api.get("/api/users");
    assert.strictEqual(usersAfter.body.length, usersBefore.body.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
