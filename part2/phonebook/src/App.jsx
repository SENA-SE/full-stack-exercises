import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
// import axios from 'axios'
import personService from './Services/persons'
import Notification from './Components/Notification'

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
  const [message, setMessage] = useState('default message')
  const [messageStatus, setMessageStatus] = useState(null)

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
        .catch(e => {
        setMessage(`Information of ${newName} has already been removed from server`)
        setMessageStatus('Error')
  
        setTimeout(() => {
              setMessageStatus(null)
            }, 5000)
      })
      }


      return
    }


    personService.create(newPerson).then(res => {
      setPersons(persons.concat(res))
      setNewName('')
      setNewNumber('')

      setMessage(`${newName} is added to the phonebook`)
      setMessageStatus('Success')

      setTimeout(() => {
            setMessageStatus(null)
          }, 5000)
    })
  }

  const handleDelete = (e) => {

    if (window.confirm(`Delete ${e.target.name} ?`)) {
      personService.delete(e.target.id).then(res => {
        console.log(res);
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

    <div>
      <h2>Phonebook</h2>
      {messageStatus && <Notification message={message} status={messageStatus}/>}
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