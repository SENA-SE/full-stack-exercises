import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const Statistics = ({ good, neutral, bad }) => (
  <>
    <h1>Statistics</h1>

    {
      good == 0 && neutral == 0 && bad == 0 ? "No feedback given" :
        <table><tbody>
          {/* <div>Good: {good}</div>
            <div>Neutral: {neutral}</div>
            <div>Bad: {bad}</div>
            <div>All: {good + neutral + bad}</div>
            <div>Average: {(good - bad) / (good + neutral + bad) || 0}</div>
            <div>Positive: {(good) * 100 / (good + neutral + bad) || 0}%</div> */}

          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={good + neutral + bad} />
          <StatisticLine text="Average" value={(good - bad) / (good + neutral + bad) || 0} />
          <StatisticLine text="Positive" value={((good) * 100 / (good + neutral + bad) || 0) + "%"} />
        </tbody></table>
    }

  </>
)


export default App