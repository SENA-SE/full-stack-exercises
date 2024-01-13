const Persons = ({ filteredPersons, persons, handleDelete }) => (
  <div>
    {
      filteredPersons.length > 0 ? filteredPersons.map(person =>
        <p key={person.name}>{person.name} {person.number} <button name={person.name} key={person.id} id={person.id} onClick={handleDelete}>delete</button></p>    
      ) :
        persons.map(person =>
        <p key={person.name}>{person.name} {person.number} <button name={person.name} key={person.id} id={person.id} onClick={handleDelete}>delete</button></p>    
        )
    }

  </div>
)

export default Persons