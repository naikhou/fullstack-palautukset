import React, { useState } from 'react'

const Blog = ({blog, updateBlog, removeBlog, user}) => {
  const [viewAll, setViewAll] = useState(false)
  const username = user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    updateBlog(blog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog)
    }
  }

  return (
  <>
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={()=>setViewAll(!viewAll)}>view</button>
      {viewAll && (
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={handleLike}>like</button></div>
        <div>{blog.user.username}</div>
        { username === blog.user.username && (
          <button onClick={handleRemove}>remove</button>
        )
        }
      </>
    )}
    </div>
    
  </>
)}

export default Blog