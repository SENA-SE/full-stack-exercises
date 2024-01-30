import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import UserBlog from './components/UserBlog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError] = useState(false)

  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )
  // }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(exception.response?.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleSubmitBlog = async (event) => {
    console.log(title, author, url)
    event.preventDefault()

    const response = await blogService.create({ title, author, url })
    if (response?.response?.data?.error) {
      setMessage(response.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      setMessage(`A new blog ${response.data.title} by ${response.data.author} is added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

  }
  return (
    <div>

      {user === null && <LoginForm handleLogin={handleLogin} handleUsernameChange={setUsername} handlePasswordChange={setPassword} username={username} password={password} errorMessage={message} />}
      {user !== null && <UserBlog user={user} blogs={blogs} handleLogout={handleLogout} setBlogs={setBlogs}/>}

      {user !== null && <Togglable buttonLabel="new blog">
        <CreateForm handleSubmitBlog={handleSubmitBlog} handleAuthorChange={setAuthor} handleTitleChange={setTitle} handleUrlChange={setUrl} errorMessage={message} title={title} url={url} author={author} />
      </Togglable>}
    </div>
  )
}

export default App