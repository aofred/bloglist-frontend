import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser('')
    blogService.setToken('')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({ 
        title, author, url
       })
       setErrorMessage(`${title} by ${author} added`)
       setTitle('')
       setAuthor('')
       setUrl('')
    } catch (exception) {
      setErrorMessage('Could not create a new blog')
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!user) {
    return (
      <div>
        <Notification message={errorMessage} />
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <Notification message={errorMessage}/>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <button 
        type="button" 
        onClick={handleLogout}>
          Log out
        </button>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
      <div>
        <BlogForm 
        addBlog={addBlog} 
        title={title} setTitle={setTitle} 
        author={author} setAuthor={setAuthor} 
        url={url} setUrl={setUrl}/>
      </div>
    </div>
  )
}

export default App