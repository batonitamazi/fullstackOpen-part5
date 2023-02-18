import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setSuccessMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      setBlogs(blogs.concat(returnedBlog))
    })
  }
  const updateBlog = (blogObject) => {
    blogService.update(blogObject).then(() => {

    })
  }
  const deleteBlog = (blogToDelete) => {
    if(window.confirm(`delete ${blogToDelete.title}`)){
      blogService.remove(blogToDelete).then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      })
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wront Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const showBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a,b) => {
      return a.likes - b.likes
    })
    return sortedBlogs.map((blog) => (
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
    ))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {!user && loginForm()}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>log out</button>
          </p>
          <Togglable buttonLabel="create new Blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
              setSuccessMessage={setSuccessMessage}
            />
          </Togglable>
          {showBlogs(blogs)}
        </>
      )}
    </div>
  )
}

export default App
