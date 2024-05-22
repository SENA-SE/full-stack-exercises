/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import {LOGIN} from '../queries';

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      const setToken = props.setToken
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); 

  const submit = async (event) => {
    event.preventDefault();
    login({variables: {username, password}});
    setUsername("");
    setPassword("");
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username: 
          <input value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          Password: 
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
export default Login;