import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anecdotesArr = anecdotes.map(anecdote => ({ anecdote, vote: 0 }))

  const [selected, setSelected] = useState(0)
  const [arr, setArr] = useState(anecdotesArr)
  const handleVote = () => {

    const tempArr = [...arr]
    tempArr[selected].vote += 1
    setArr(tempArr)
  }
  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {arr[selected].vote} votes
      <div>
        {selected >=1 ? <Button text="Previous anecdote" handleClick={() => setSelected(selected - 1)} /> : <></>}
        <Button text="Vote" handleClick={handleVote} />
        {selected < arr.length-1 ? <Button text="Next anecdote" handleClick={() => setSelected(selected + 1)} />: <></>}
      </div>
      <Statistics anecdotesArr={arr}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({anecdotesArr}) => {
  const maxVote = Math.max(...anecdotesArr.map(anecdote => anecdote.vote))
  const maxAnecdotes = anecdotesArr.filter(anecdote => anecdote.vote == maxVote)
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {maxVote == 0 ? "No anecdote has been voted yet" :
        maxAnecdotes.map(anecdote => (<div>{anecdote.anecdote}</div>))
      }
      <p>have {maxVote} votes</p>
    </>
  )
}

export default App