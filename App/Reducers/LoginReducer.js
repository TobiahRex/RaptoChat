import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  active: false,
  attempting: false,
  errorCode: null
})
// firebase Auth state change.
const change = (state, action) =>
state.merge({
  attempting: false,
  active: action.uid ? true : false
})

const registerAttempt = (state) =>
state.merge({ attempting: true })

const registerSuccess = (state, action) =>
state.merge({
  active: true,
  attempting: false
})

// login attempts
const loginAttempt = (state) =>
state.merge({ attempting: true })

const loginSuccess = (state) =>
state.merge({
  active: false,
  attempting: false
})

// login / register failure
const failure = (state) =>
state.merge({ attempting: false })

// logout
const logoutSuccess = (state, action) => state.merge({
  uid: null,
  email: null,
  errorCode: null,
  attempting: false,
  active: false
})
// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.AUTH_CHANGE]: change,
  [Types.REGISTER_ATTEMPT]: registerAttempt,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: failure,
  [Types.LOGIN_ATTEMPT]: loginAttempt,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_SUCCESS]: logoutSuccess
}
export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
