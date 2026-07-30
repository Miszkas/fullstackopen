import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [open, setOpen] = useState(false)

  const isOwned = user && blog.user && user.id === blog.user.id

  return (
    <div className="blog">
      <div className="blog-title">
        {blog.title}{' '}
        <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'view'}</button>
      </div>
      <div>Author: {blog.author}</div>
      {open && (
        <div>
          <div className="blog-url">
            URL:{' '}
            <a href={blog.url} target="_blank">
              {blog.url}
            </a>
          </div>
          <div className="blog-likes">
            Likes: {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>
            {isOwned && (
              <button onClick={() => handleDelete(blog)}>delete</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
