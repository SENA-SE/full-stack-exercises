import { useDispatch } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addAnecdote(e.target.content.value))
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