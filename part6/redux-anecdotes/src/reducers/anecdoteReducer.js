import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)
const initialState = []

const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState:initialState,
  reducers:{
    voteAnecdote(state, action){
      const id = action.payload.id
      return state.map((anecdote) => (anecdote.id == id)?{...anecdote,votes: anecdote.votes+1}: anecdote)
    },
    addAnecdote(state, action){
      // state.push(asObject(action.payload))
      state.push(action.payload)
      
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const initializeList = () => 
  async (dispatch) => {
    const anecdoteList = await anecdoteService.getAll()
    dispatch(setAnecdoteList(anecdoteList))
  }

export const createAnecdote = (content) => 
  async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)

    console.log(newAnecdote)
    dispatch(addAnecdote(newAnecdote))
  }

export const addVote = (anecdote) => 
  async(dispatch) => {
    console.log(anecdote)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}

    await anecdoteService.addVote(anecdote.id, updatedAnecdote)
    dispatch(voteAnecdote(anecdote))
  }
export const {voteAnecdote, addAnecdote, setAnecdotes: setAnecdoteList} = anecdoteSlice.actions
export default anecdoteSlice.reducer