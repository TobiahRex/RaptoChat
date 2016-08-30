import Types from './Types'

const attemptRegister = (email, password) =>
({ type: Types.REGISTER_ATTEMPT, email, password })
const registerSuccess = (x) =>
({ type: Types.REGISTER_SUCCESS, username: x })


const attemptLogin = (username, password) =>
({ type: Types.LOGIN_ATTEMPT, username, password })
const loginSuccess = (username) =>
  ({ type: Types.LOGIN_SUCCESS, username })
const loginFailure = (errorCode) =>
  ({ type: Types.LOGIN_FAILURE, errorCode })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

// const requestTemperature = (city) => ({ type: Types.TEMPERATURE_REQUEST, city })
// const receiveTemperature = (temperature) => ({ type: Types.TEMPERATURE_RECEIVE, temperature })
// const receiveTemperatureFailure = () => ({ type: Types.TEMPERATURE_FAILURE })

/**
 Makes available all the action creators we've created.
 */
export default {
  attemptLogin,
  attemptRegister,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  // requestTemperature,
  // receiveTemperature,
  // receiveTemperatureFailure
}
