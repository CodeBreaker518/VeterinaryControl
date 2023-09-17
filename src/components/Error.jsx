import PropTypes from 'prop-types'

const Error = ({ message }) => {
  return (
    <div className='border-red-800 bg-red-800 border-2 font-bold text-lg text-white rounded-md uppercase text-center p-2 mb-5 pulse-animation'>
      <p>{message}</p>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Error
