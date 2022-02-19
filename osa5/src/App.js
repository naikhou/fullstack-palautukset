import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
      
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in")
    try {
    const user = await loginService.login({ username, password })

    setUser(user)
    setUsername('')
    setPassword('')
    
  } catch (error) {

  }

  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  if (user === null) {
    return (
    <>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div> username
        <input type="text" onChange={handleNameChange} value={username} name="Username"></input>
      </div>
      <div> password
        <input type="text" onChange={handlePasswordChange} value={password} name="Password"></input>
      </div>
      <button type="submit" onClick={handleLogin}>login</button>
    </form>
    </>)
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{`${user.name} logged in`}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App