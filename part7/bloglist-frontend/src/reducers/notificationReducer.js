

export const setNotification = (text) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: text,
    })

    setTimeout(
      () =>
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        }),
      5000
    )
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export default notificationReducer
