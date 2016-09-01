import Types from './Types'

const receivedUser = (user, settings) =>
({ type: Types.USER_RECEIVED, user, settings })

const receivedActiveUsers = (users) =>
({ type: Types.ACTIVE_USERS_RECEIVED, users })

const authChange = (username, email, uid, photo) =>
({ type: Types.AUTH_CHANGE, username, email, uid, photo })

const registerAttempt = () =>
({ type: Types.REGISTER_ATTEMPT })

const registerSuccess = () =>
({ type: Types.REGISTER_SUCCESS })

const registerFailure = () =>
({ type: Types.REGISTER_FAILURE })

const loginAttempt = () =>
({ type: Types.LOGIN_ATTEMPT })

const loginFailure = (errorCode) =>
({ type: Types.LOGIN_FAILURE, errorCode })

const logoutFailure = () =>
({ type: Types.LOGOUT_FAILURE })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

/**
Makes available all the action creators we've created.
*/

export default {
  receivedUser,
  receivedActiveUsers,
  authChange,

  registerAttempt,
  registerSuccess,
  registerFailure,

  loginAttempt,
  loginFailure,

  logout,
  logoutFailure,
  startup
}
