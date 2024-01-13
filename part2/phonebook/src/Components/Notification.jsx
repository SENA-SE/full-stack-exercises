const Notification = ({ message, status }) => {
  console.log(status);
  const color = status == "Success" ? "green" : "red"
  const style = {
    color,
    fontStyle: 'italic',
    fontSize: 16
  }
  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification