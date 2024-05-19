import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useQuery} from '@apollo/client';

import {ALL_AUTHORS, ALL_BOOKS} from './queries';

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);

  if (authors.loading || books.loading) {
    return <div>Loading...</div>;
  }

  const notification = (message) => { 
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 10000);
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} />

      <Books show={page === "books"} books={books.data.allBooks}/>

      <NewBook show={page === "add"} setError={notification}/>
    </div>
  );
};

export default App;