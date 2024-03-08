/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { popNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button type="button" onClick={() => handleVote(anecdote.id)}>vote</button>
    </div>
  </div>
)

const AnecdoteList= () => {
  const anecdotesList = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter((anecdote) => {
      console.log(filter)
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }
  ))
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(popNotification(`You voted for ${anecdote.content}`, 3))
  };

  return (
    <div>
      {anecdotesList.toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => vote(anecdote)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList