import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from '../requests'
const App = () => {
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn : voteAnecdote,
    onSuccess: (_, updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.map(
        (anecdote)=> (anecdote.id == updatedAnecdote.id ? updatedAnecdote: anecdote)))
    }
  })
  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    voteAnecdoteMutation.mutate(updatedAnecdote)
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
