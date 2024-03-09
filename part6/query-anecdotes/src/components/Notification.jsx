import { useContext, useEffect, createContext } from "react"
import NotificationContext from "../NotificationContext"
const notificationReducer = (state, action) => {
  switch(action.type){
    case 'SHOW_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

const Notification = () => {
  const [state] = useContext(NotificationContext)
  console.log(state)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    state && <div style={style}>{state}</div>
  );
}
export {notificationReducer}
export default Notification
