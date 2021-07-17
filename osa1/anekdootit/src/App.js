import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const taulukko = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(taulukko)
  const [index, setIndex] = useState(0)

  const handleRandomize = () => {
    const min = 0
    const max = anecdotes.length - 1
    const rand = Math.round(min + Math.random() * (max - min))
    setSelected(rand)
  }

  //HUOM!!!! Jostain syystä eniten ääniä saanut anekdootti päivittyy
  //yhden vote-napin painalluksen viiveellä!!!
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
    console.log(votes) 
    const mostPopular = mostPopularIndex()
    setIndex(mostPopular)    
    console.log(votes)
  }

  const mostPopularIndex = () => {
    const max = Math.max(...votes)
    const i = votes.indexOf(max)
    return i    
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Display voteCount={votes[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleRandomize} text="randomize" />  
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </>
  )
}


const Display = (props) => {
  return(
    <p>has {props.voteCount} votes</p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
} 

export default App