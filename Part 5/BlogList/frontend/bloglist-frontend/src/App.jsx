import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.loginService({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      showNotification(`Logged in as ${user.username} successfully`, "success");
    } catch (error) {
      showNotification("Wrong username or password", "error");
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => {
    console.log(`logging out ${user.username}`);
    showNotification(`Logged out ${user.username} successfully`, "success");
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const newBlogObject = {
      title: title,
      author: author,
      url: url,
    };

    const response = await blogService.create(newBlogObject, user.token);
    setBlogs(blogs.concat(response));
    showNotification(
      `A new blog ${response.title} by ${response.author} added`,
      "success",
    );
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {!user && loginForm()}
      {user && (
        <div>
          <div>
            <span>{user.username} logged in</span>
            {"  "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <hr />
          <div>
            <ul>
              {blogs.map((blog) => (
                <li key={blog.id}>
                  <a href={blog.url} target="_blank" rel="noopener noreferrer">
                    <span className="blog-title">{blog.title}</span> by{" "}
                    {blog.author}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div>
            <h3>Create New Blog</h3>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <br />
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <br />
            <button type="submit" onClick={handleCreateBlog}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
