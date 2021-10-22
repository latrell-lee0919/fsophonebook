import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import entryService from './services/entries'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    entryService
    .getAll()
    .then(startingEntries => {
      setPersons(startingEntries)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    let match = false;
    // add this code back in when i get to 3.17, simply add the put route to backend

    for(let i = 0; i < persons.length; i++) {
      if (persons[i].name === nameObject.name) {
        window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
        match = true;
      }
    }

    if(match) {
      const person = persons.find(p => p.name === nameObject.name);
      const id = person.id
      const newEntry = {...person, number: newNumber}
      entryService
      .update(person.id, newEntry)
      .then(returnedEntry => {
        setPersons(persons.map(person => person.id !== id ? person : returnedEntry))
      })
      .catch(error => {
        setErrorMessage(
          `Information for ${nameObject.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }

    if (!match) {
      entryService
      .create(nameObject)
      .then(returnedEntry => {
        setPersons(persons.concat(returnedEntry))
        setMessage(
          `Added ${nameObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const errObj = error.response.data
        setErrorMessage(errObj.error)
      })
    }
  }



  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      console.log(`removing ${person.name}`)
      entryService
      .remove(id)
      .then(remainingEntries => {
        return entryService.getAll()
      })
      .then(remainingEntries => setPersons(remainingEntries))
    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
      addName={addName} 
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase())).map(person =>
          <Persons 
          key={person.id} 
          name={person.name} 
          number={person.number}
          removePerson={() => removePerson(person.id)}
          />
          )}
      </div>
    </div>
  )
}

export default App