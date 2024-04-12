import blogService from '../services/blogs'

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: user
    })}
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT_USER'
    })}
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        user: user
      })
    }
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export default userReducer