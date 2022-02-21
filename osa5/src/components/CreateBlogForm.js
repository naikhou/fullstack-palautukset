import { React, useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogToPost = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    createBlog(blogToPost)
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>title
        <input id='title' type='text' name='title' onChange={({ target }) => {
          setNewBlog({ ...newBlog, title: target.value })}
        }>
        </input>
      </div>
      <div>author
        <input id='author' type='text' name='author' onChange={({ target }) => {
          setNewBlog({ ...newBlog, author: target.value })}
        }>
        </input>
      </div>
      <div>url
        <input id='url' type='text' name='url' onChange={({ target }) => {
          setNewBlog({ ...newBlog, url: target.value })}
        }>
        </input>
      </div>
      <button id='create-blog' type="submit">create blog</button>
    </form>
  )
}

export default CreateBlogForm