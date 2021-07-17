import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //yhteensä ääniä
  const [all, setAll] = useState(0)
  //pisteet
  const [points, setPoints] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setPoints(points + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    //nollaa ei tarvitse lisätä
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setPoints(points - 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics goodCount={good}
                  neutralCount={neutral} 
                  badCount={bad} 
                  allCount={all} 
                  average={points/all} 
                  positive={(good/all) * 100 + ' %'}
                  />
    </>
  )
}

const StatisticLine = (props) => {
  return(
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </tr>
      
    </>
  )
}

const Statistics = (props) => {
  if (props.allCount === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <table>
      <tbody>
      <StatisticLine text="good" value={props.goodCount} />
      <StatisticLine text="neutral" value={props.neutralCount} />
      <StatisticLine text="bad" value={props.badCount} />
      <StatisticLine text="all" value={props.allCount} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
      </tbody>
    </table>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

export default App