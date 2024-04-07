import { useEffect } from 'react'

const Notification = ({ message, clear }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clear()
    }, 5000)

    return () => clearTimeout(timer)
  }, [clear])

  return <div>{message}</div>
}

export default Notification