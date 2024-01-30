const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  errorMessage
}) => (
  <form onSubmit={handleLogin}>
    <h1>Log in to application</h1>
    {errorMessage && <div>{errorMessage}</div>}
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm