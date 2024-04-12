import loginService from "../services/login"
import blogService from "../services/blogs"
import { showMessage } from "./notificationReducer"

const currentUser = window.localStorage.getItem('currentUser')
const initailState = currentUser ?
  JSON.parse(currentUser) : null;
if (initailState) {
  blogService.setConfig(initailState.token)
}

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (data) => {
  return async dispatch => {
    try {
      const user = await loginService.login(data)
      blogService.setConfig(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
      window.localStorage.setItem(
        'currentUser', JSON.stringify(user)
      )

    } catch (e) {
      dispatch(showMessage(e.response.data.error, 'error', 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({type: 'LOGOUT' })
  }

}

export default reducer