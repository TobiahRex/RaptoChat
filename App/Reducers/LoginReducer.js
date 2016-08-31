import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  uid: null,
  email: null,
  errorCode: null,
  attempting: false,
  active: false
})

// login attempts
const attemptLogin = (state) =>
state.merge({ attempting: true })

const attemptRegister = (state) =>
state.merge({ attempting: true })

// firebase Auth state change.
const change = (state, action) =>
state.merge({
  uid: action.uid,
  email: action.email,
  attempting: false,
  active: action.uid ? true : false
})

// login failure
const failure = (state, action) =>
state.merge({ attempting: false, errorCode: action.errorCode })

// logout
const logout = (state, action) => state.merge({
  uid: null,
  email: null,
  errorCode: null,
  attempting: false,
  active: false
})
// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.AUTH_CHANGE]: change,
  [Types.REGISTER_ATTEMPT]: attemptRegister,
  [Types.LOGIN_ATTEMPT]: attemptLogin,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
