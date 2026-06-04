const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((favourite, blog) =>
    blog.likes > favourite.likes ? blog : favourite,
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(authorCounts).reduce(
    (max, [author, blogs]) => {
      return blogs > max.blogs ? { author, blogs } : max;
    },
    { author: "", blogs: 0 },
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  return Object.entries(authorCounts).reduce(
    (max, [author, likes]) => {
      return likes > max.likes ? { author, likes } : max;
    },
    { author: "", likes: 0 },
  );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
