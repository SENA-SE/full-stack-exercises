/* eslint-disable react/prop-types */
import { useState } from "react"
const Books = (props) => {

  const [genre, setGenre] = useState(null)
  let genres = props.books.map((book) => book.genres).flat()
  genres = [...new Set(genres)]
  if (!props.show) {
    return null
  }

  const filteredBooks = genre ? props.books.filter((book) => book.genres.includes(genre)) : props.books
  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}  
        
      </div>
    </div>
  )
}

export default Books
