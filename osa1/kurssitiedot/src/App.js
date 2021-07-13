import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
               part2={part2} exercises2={exercises2}
               part3={part3} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>     
        <Part osa={props.part1} exercise={props.exercises1} />
        <Part osa={props.part2} exercise={props.exercises2} />
        <Part osa={props.part3} exercise={props.exercises3} />      
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.osa} {props.exercise}
      </p>
    </>
  )
}

export default App