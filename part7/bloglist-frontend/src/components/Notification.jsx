import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  return <div>
    {props?.message}
  </div>

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification
