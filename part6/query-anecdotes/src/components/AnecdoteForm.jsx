import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import { useContext,useReducer } from 'react'
import NotificationContext from '../NotificationContext'
import { notificationReducer } from './Notification'
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (_, updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(updatedAnecdote))
    },
    onError:(error) => {
      notificationDispatch({
        type:'SHOW_MESSAGE',
        message: error.response.data.error
      })
      setTimeout(()=>{
        notificationDispatch({type:'CLEAR_MESSAGE'})
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
