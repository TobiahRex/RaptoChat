import Types from './Types'

const authChange = (username, email, uid, photo) =>
({ type: Types.AUTH_CHANGE, username, email, uid, photo })

const attemptRegister = () =>
({ type: Types.REGISTER_ATTEMPT })

const registerSuccess = (username) =>
({ type: Types.REGISTER_SUCCESS, username })

const attemptLogin = () =>
({ type: Types.LOGIN_ATTEMPT })

const loginSuccess = (email) =>
({ type: Types.LOGIN_SUCCESS, email })

const loginFailure = (errorCode) =>
({ type: Types.LOGIN_FAILURE, errorCode })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

/**
Makes available all the action creators we've created.
*/

export default {
  authChange,
  attemptLogin,
  attemptRegister,
  registerSuccess,
  loginSuccess,
  loginFailure,
  logout,
  startup
}
