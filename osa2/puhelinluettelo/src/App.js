import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

const handleAdd = (event) => {
  event.preventDefault() //estää oletusarvoisen toiminnan, mm. sivun uudelleenlatautumisen
  const found = persons.find(person => person.name === newName)

  const newPerson = {
    name: newName,
    number: newNumber
  }

  if(found === undefined) {
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} has been added to phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)  
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)  
      })
    
  } else {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(found.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setMessage(`${newName}'s number has been modified`)
              setTimeout(() => {
                setMessage(null)
              }, 5000) 
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000) 
          })
                  
      setNewName('')
      setNewNumber('')
    }
  }
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}


const handleRemoveOf = (id) => {
  const name = persons.find(person => person.id === id).name
  if(window.confirm(`Do you really want to remove ${name}`)){
    personService
    .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
      setMessage(`'${name}' has been removed from the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)   
  }
}

const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={newFilter} onChange={handleFilterChange}/>

      <h2>add a new</h2>

      <form>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      { 
        filteredPersons.map(person => 
        <Person 
          key={person.name} 
          person={person} 
          handleRemove={() => handleRemoveOf(person.id)}/>)
      }
    </>
  )

}

const Person = ({person, handleRemove}) => {
  return(      
    <div>{person.name} {person.number} <button onClick={handleRemove}>Delete</button></div>                 
  )
}


const Filter = ({filter, onChange}) => {
  return (
    <div>filter shown with <input value={filter} onChange={onChange} /></div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App