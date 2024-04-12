let timer;

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {
        message: action.data.message,
        type: action.data.type
      }
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}
export const showMessage = (message, type, time) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'SHOW_MESSAGE',
      data: {
        message,
        type
      }
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      })}, time * 1000)
  }
}


export default reducer