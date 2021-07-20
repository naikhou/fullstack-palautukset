import React from 'react'

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  )
}

const Content = ({course}) => {
  return (
    <> 
        {
          course.parts.map(part => 
          <Part key={part.id} osa={part.name} harjoitukset={part.exercises}/>
        )}     
    </>
  )
}

const Total = ({course}) => {
  const total = 
    course.parts.reduce( (s, p) => s+p.exercises, 0)

  return (
    <>
      <p>
        <strong>
          Total of {total} exercises 
        </strong>
      </p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.osa} {props.harjoitukset}
      </p>
    </>
  )
}

export default Course