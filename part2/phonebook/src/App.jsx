import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const addName = (e) => {
    e.preventDefault()
    const newPerson = { "name": newName, "number": newNumber }
    if (persons.some(p => p.name == newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const newPersons = [...persons, newPerson]
    setPersons(newPersons)
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }
  const handleChangeNumber= (e) => {
    setNewNumber(e.target.value)
  }
  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with<input value={search} onChange={handleChangeSearch} />
      </div>
      <h2>Add a New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App