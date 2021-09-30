import React, { useState } from 'react'
import Info from './components/Info'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

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
      number: newNumber,
      id: persons.length + 1
    }
    
    let match = false;

    for(let i = 0; i < persons.length; i++) {
      if (persons[i].name === nameObject.name) {
        window.alert(`${newName} is already added to phonebook`)
        match = true;
      }
    }
    if (!match) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    console.log('button clicked', event.target)
  }

  const filter = (event) => {
    event.preventDefault()
    const filterVal = newFilter

    for(let i = 0; i < persons.length; i++) {
      if(persons[i].name.includes(filterVal)) {
        // do something
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          filter shown with <input value={newFilter} onChange={handleFilterChange}/>
        </div>
        <div>
          <h2>add a new</h2>
        </div>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Info key={person.id} name={person.name} number={person.number}/>
          )}
      </div>
    </div>
  )
}

export default App