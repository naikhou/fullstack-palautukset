import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter] = useState('')
  //const [ filtered, setFiltered ] = useState([])

  //Haetaan data. Tämä funktio suoritetaan ensimmäisen renderöinnin jälkeen.
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}

const handleClickOf = name => {
  setNewFilter(name)
}

const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

if(filteredCountries.length > 10) {
  return(
    <>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <div>Too many matches, specify another filter</div>
    </>
  )
}
if(filteredCountries.length === 1) {
  return(
    <>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <CountryInfo country={filteredCountries[0]} />
    </>
  )
}
if(filteredCountries.length <= 0) {  
  return(
    <>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <div>No matches</div>
    </>
  ) 
}

  return(
    <>
    <Filter filter={newFilter} onChange={handleFilterChange}/>
    {
      filteredCountries.map(country => {
        return (
          <Country key={country.name} country={country} handleClick={() => handleClickOf(country.name)}/>   
        )
      })
    }
    </>
  )
}

//komponentit

const CountryInfo = ({country}) => {
  return(
    <>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul>
      {
        country.languages.map(language => 
          <li key={language.name}>{language.name}</li>)
      }
    </ul>
    <img src={country.flag} width="128" height="128" alt="country's flag"/>
    </>
  )
}

const Country = ({country, handleClick}) => {
  return(
      <div>{country.name} <button onClick={handleClick}>show</button></div>  
  )
}


const Filter = (props) => {
  return(
    <div>find countries <input value={props.filter} onChange={props.onChange}/></div>
  )
}

export default App;
