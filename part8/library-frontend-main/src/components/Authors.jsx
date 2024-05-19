/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  console.log(props.authors)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeAuthor, result] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()
    changeAuthor({ variables: { name, born }})
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }
  , [result.data])
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <input value={name} onChange={({ target }) => setName(target.value)}/>
        </div>
        <div>
          Born
          <input value={born} onChange={({ target }) => setBorn(Number(target.value))}/>
        </div>
        <button type='submit'>update author</button>
        </form>
    </div>
  )
}

export default Authors
