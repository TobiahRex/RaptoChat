import Types from './Types'

const receivedUser = (user, settings, location) =>
({ type: Types.USER_RECEIVED, user, settings, location })

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

const loginSuccess = () =>
({ type: Types.LOGIN_SUCCESS })

const loginFailure = (errorCode) =>
({ type: Types.LOGIN_FAILURE, errorCode })

const logoutAttempt = () =>
({ type: Types.LOGOUT_ATTEMPT })

const logoutSuccess = () =>
({ type: Types.LOGOUT_SUCCESS })

const logoutFailure = () =>
({ type: Types.LOGOUT_FAILURE })

const startup = () => ({ type: Types.STARTUP })

const setActiveCategory = (category) =>
({ type: Types.SET_ACTIVE_CATEGORY, category })

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
  loginSuccess,

  logoutAttempt,
  logoutSuccess,
  logoutFailure,

  startup,

  setActiveCategory
}
