import { useDispatch } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        // dispatch(addAnecdote(e.target.content.value))

        const newAnecdote = await anecdoteService.createNew(e.target.content.value)
        dispatch(addAnecdote(newAnecdote))
        e.target.content.value = ''
    }

    return (
        <div>
            <h2>Create new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <input name='content'/>
                <button type='submit'>Create anecdote</button>
            </form>
        </div>
    )
}

export default AnecdoteForm