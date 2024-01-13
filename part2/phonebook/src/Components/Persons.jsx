const Persons = ({ filteredPersons, persons }) => (
  <div>
    {
      filteredPersons.length > 0 ? filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
        persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    }
  </div>
)

export default Persons