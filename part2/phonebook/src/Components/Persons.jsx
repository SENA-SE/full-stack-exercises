const Persons = ({ filteredPersons, persons, handleDelete }) => (
  <div>
    {
      filteredPersons.length > 0 ? filteredPersons.map(person =>
        <><p key={person.name}>{person.name} {person.number}</p>    <button name={person.name} id={person.id} onClick={handleDelete}>delete</button></>
      ) :
        persons.map(person =>
        <><p key={person.name}>{person.name} {person.number}</p>    <button name={person.name} id={person.id} onClick={handleDelete}>delete</button></>
        )
    }

  </div>
)

export default Persons