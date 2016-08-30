import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  uid: null,
  username: null,
  email: null,
  photo: null,
  errorCode: null,
  attempting: false,
  active: false
})

// login attempts
const attempt = (state) =>
state.merge({ attempting: true })

// firebase Auth state change.
const change = (state, action) =>
  state.merge({ uid: action.uid, username: action.username, email: action.email, photo: action.photo })

// login failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// logout
const logout = (state, action) =>
  state.merge({ username: null })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.AUTH_CHANGE]: change,
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
