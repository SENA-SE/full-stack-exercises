import { useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import AnecdoteList from './Components/AnecdoteList'
import About from './Components/About'
import Create from './Components/Create'
import Menu from './Components/Menu'
import Footer from './Components/Footer'
import Anecdote from './Components/Anecdote'
import Notification from './Components/Notification'

const App = () => {
  const navigate = useNavigate()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} is created!`)
    navigate('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdote/:id')
  const anecdote = match ? anecdotes.find((a => a.id == Number(match.params.id))):null
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} clear={() => setNotification('')} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />}/>
        <Route path="/create" element={<Create addNew={addNew} />}/>
        <Route path='/anecdote/:id' element={<Anecdote anecdote = {anecdote} />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
