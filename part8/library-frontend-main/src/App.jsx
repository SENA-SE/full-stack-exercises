import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useQuery} from '@apollo/client';
import { useApolloClient, useSubscription } from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, USER, NEW_BOOK} from './queries';
import Notification from "./components/Notification";
import Login from "./components/Login";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const user = useQuery(USER);

  const [page, setPage] = useState("authors");
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  // useSubscription(NEW_BOOK, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     const newBook = subscriptionData.data.bookAdded;
  //     setErrorMsg(`New book added: ${newBook.title}`);
  //     books.refetch();
  //     authors.refetch();
  //   }
  // });

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
      <button onClick={() => setPage("recommend")}>recommend</button>
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} setError={setNotification}/>

      <Books show={page === "books"} books={books.data.allBooks}/>

      <NewBook show={page === "add"} setError={setNotification}/>

      <Login show={page === "login"} setToken={setToken} setError={setNotification}/>

      <RecommendedBooks show={page === "recommend"} books={books.data.allBooks} user={user.data.me}/>
    </div>
  );
};

export default App;
