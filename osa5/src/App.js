import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogsChanged, setBlogsChanged] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => {
        return b.likes - a.likes
      }) )
    )  
  }, [blogsChanged])

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('userLoggedIn')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in")
    try {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('userLoggedIn', JSON.stringify(user))

    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    
  } catch (error) {
    setNotificationMessage('wrong username or password')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    //poistetaan tieto käyttäjästä selaimen localstoragesta
    window.localStorage.removeItem('userLoggedIn')
  }

  const handleCreateBlog = async (blogToPost) => {
    const addedBlog = await blogService.createBlog(blogToPost)
    if(addedBlog) {
      setBlogsChanged(!blogsChanged)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      setNotificationMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} succesfully added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const blogFormRef = useRef()

  const handleUpdateBlog = async (blog) => {
    await blogService.updateBlog(blog)
    setBlogsChanged(!blogsChanged)
  }

  const handleRemoveBlog = async (blog) => {
    await blogService.removeBlog(blog)
    setBlogsChanged(!blogsChanged)
  }

  if (user === null) {
    //login form
    return (
    <>
    <h2>log in to application</h2>
    <Notification message={notificationMessage} error={true}/>
    <form onSubmit={handleLogin}>
      <div> username
        <input type="text" onChange={handleNameChange} value={username} name="Username"></input>
      </div>
      <div> password
        <input type="text" onChange={handlePasswordChange} value={password} name="Password"></input>
      </div>
      <button type="submit">login</button>
    </form>
    </>)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} error={false}/>
      <p>{`${user.name} logged in`} <button type="submit" onClick={handleLogout}>logout</button></p>  
      <Togglable ref={blogFormRef} buttonLabel='new blog'>
        <CreateBlogForm createBlog={handleCreateBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} removeBlog={handleRemoveBlog} user={user}/>
      )}
    </div>
  )
}

export default App