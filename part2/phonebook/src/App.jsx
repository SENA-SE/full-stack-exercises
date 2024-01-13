import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'
import personService from './Services/persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
    personService.getAll().then(res => {
      setPersons(res)
    })
  }, [])



  const addName = (e) => {
    e.preventDefault()
    const newPerson = { "name": newName, "number": newNumber }
    const foundedPerson = persons.find(p => p.name === newName);
    if (foundedPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(foundedPerson.id, newPerson).then(res => {
          personService.getAll().then(res => {
            setPersons(res)
          })
        })
      }


      return
    }

    // const newPersons = [...persons, newPerson]
    // setPersons(newPersons)

    // axios
    // .post('http://localhost:3001/persons', newPerson)
    // .then(response => {
    //   console.log(response)
    //   setPersons(persons.concat(response.data))
    //   setNewName('')
    //   setNewNumber('')
    // })

    personService.create(newPerson).then(res => {
      setPersons(persons.concat(res))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDelete = (e) => {
    // console.log(e.target.name);
    if (window.confirm(`Delete ${e.target.name} ?`)) {
      personService.delete(e.target.id).then(res => {
        personService.getAll().then(res => {
          setPersons(res)
        })
      })
    }

  }
  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) || []

  return (
    //   <div>
    //   <h2>Phonebook</h2>
    //   <div>
    //       filter shown with<input value={search} onChange={handleChangeSearch} />
    //   </div>
    //   <h2>Add a New</h2>
    //   <form onSubmit={addName}>
    //     <div>
    //       name: <input value={newName} onChange={handleChangeName} />
    //     </div>
    //     <div>number: <input value={newNumber} onChange={handleChangeNumber}/></div>
    //     <div>
    //       <button type="submit">add</button>
    //     </div>
    //   </form>
    //   <h2>Numbers</h2>
    //   {
    //     filteredPersons.length > 0 ? filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
    //     persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    //   }
    // </div>
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleChangeSearch} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        name={newName}
        onNameChange={handleChangeName}
        number={newNumber}
        onNumberChange={handleChangeNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App