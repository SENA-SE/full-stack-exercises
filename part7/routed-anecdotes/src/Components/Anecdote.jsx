const Anecdote = ({ anecdote }) => {
    const {content, votes, info} = anecdote
    return (
      <div>
        <h2>{content}</h2>
        <p>has {votes} votes</p>
        <p>for more info see <a href={info}>{info}</a></p>
      </div>
    )
  }
  
  export default Anecdote