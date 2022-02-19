import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogToPost = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    const addedBlog = await blogService.createBlog(blogToPost)
    if(addedBlog) {
      setBlogs(blogs.concat(addedBlog))
      setNotificationMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} succesfully added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
    <h2>create new</h2>
      <div>title
        <input type='text' name='title' onChange={({target}) => {
          setNewBlog({...newBlog, title: target.value})}
        }> 
        </input>
        </div>
        <div>author
        <input type='text' name='author' onChange={({target}) => {
          setNewBlog({...newBlog, author: target.value})}
        }>
        </input>
        </div>
        <div>url
        <input type='text' name='url' onChange={({target}) => {
          setNewBlog({...newBlog, url: target.value})}
        }>
        </input>
      </div>
      <button type="submit">create blog</button>
    </form>
  )

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
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App