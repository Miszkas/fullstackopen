const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

const listWithSomeBlogs = [
  {
    _id: "0",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
  {
    _id: "1",
    title: "sth",
    author: "John",
    url: "https://example.com",
    likes: 10,
    __v: 0,
  },
  {
    _id: "2",
    title: "sth",
    author: "Larry",
    url: "https://example.com",
    likes: 15,
    __v: 0,
  },
  {
    _id: "3",
    title: "sth",
    author: "John",
    url: "https://example.com",
    likes: 15,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithSomeBlogs);
    assert.strictEqual(result, 45);
  });
});

describe("favourite blog", () => {
  test("of empty list is none", () => {
    const result = listHelper.favouriteBlog([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog equals itself", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("of a bigger list returns correct blog", () => {
    const result = listHelper.favouriteBlog(listWithSomeBlogs);
    assert.deepStrictEqual(result, listWithSomeBlogs[2]);
  });
});

describe("most blogs", () => {
  test("of empty list is none", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog returns its author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("of a bigger list return correct author and num of blogs", () => {
    const result = listHelper.mostBlogs(listWithSomeBlogs);
    assert.deepStrictEqual(result, { author: "John", blogs: 2 });
  });
});

describe("author with most likes", () => {
  test("of empty list is none", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog returns its author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("of a bigger list return correct author and num of blogs", () => {
    const result = listHelper.mostLikes(listWithSomeBlogs);
    assert.deepStrictEqual(result, { author: "John", likes: 25 });
  });
});
