import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useQuery} from '@apollo/client';
import { useApolloClient } from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS} from './queries';
import Notification from "./components/Notification";
import Login from "./components/Login";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const [page, setPage] = useState("authors");
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  if (authors.loading || books.loading) {
    return <div>Loading...</div>;
  }

  const logOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  const setNotification = (message) => { 
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 10000);
  }

  return (
    <div>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? <div>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logOut}>log out</button>
        </div> : <button onClick={() => setPage("login")}>login</button>
      }
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} setError={setNotification}/>

      <Books show={page === "books"} books={books.data.allBooks}/>

      <NewBook show={page === "add"} setError={setNotification}/>

      <Login show={page === "login"} setToken={setToken} setError={setNotification}/>

    </div>
  );
};

export default App;
