import propTypes from "prop-types"

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  if(isError) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>)
}

Notification.propTypes = {
  message: propTypes.string,
  isError: propTypes.bool.isRequired
}

export default Notification