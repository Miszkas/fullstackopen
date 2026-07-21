import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.loginService({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Logged in as ${user.username} successfully`, 'success')
    } catch (error) {
      showNotification('Wrong username or password', 'error')
      console.error('Error logging in:', error)
    }
  }

  const handleLogout = () => {
    console.log(`logging out ${user.username}`)
    showNotification(`Logged out ${user.username} successfully`, 'success')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={setUsername}
          handlePasswordChange={setPassword}
        />
      </Togglable>
    )
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject, user.token)
      setBlogs(blogs.concat(newBlog))
      showNotification(
        `A new blog "${newBlog.title}" by ${newBlog.author} added successfully`,
        'success',
      )
    } catch (error) {
      showNotification('Error creating blog', 'error')
      console.error('Error creating blog:', error)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      const response = await blogService.update(
        blog.id,
        updatedBlog,
        user.token,
      )
      setBlogs(blogs.map((b) => (b.id === blog.id ? response : b)))
      showNotification(
        `Liked blog "${response.title}" by ${response.author} successfully`,
        'success',
      )
    } catch (error) {
      showNotification('Error liking blog', 'error')
      console.error('Error liking blog:', error)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        showNotification(
          `Deleted blog "${blog.title}" by ${blog.author} successfully`,
          'success',
        )
      } catch (error) {
        console.log(error)
        showNotification('Error deleting Blog', 'error')
      }
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {!user && loginForm()}

      <div>
        {user && (
          <div>
            <span>{user.username} logged in</span>
            {'  '}
            <button onClick={handleLogout}>logout</button>
          </div>
        )}
        <hr />
        <div>
          <ul>
            {sortedBlogs.map((blog) => (
              <li key={blog.id}>
                <Blog
                  blog={blog}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  user={user}
                />
              </li>
            ))}
          </ul>
        </div>
        {user && (
          <>
            <hr />
            <div>{blogForm()}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
