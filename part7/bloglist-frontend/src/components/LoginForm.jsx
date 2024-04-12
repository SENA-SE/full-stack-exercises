import Notification from '../components/Notification'
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
    <Notification message={errorMessage} />
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        data-testid="username"
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        data-testid="password"
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
    </div>
    <button type="submit" id="login-button">login</button>
  </form>
)

export default LoginForm