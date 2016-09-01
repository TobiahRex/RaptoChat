import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  uid: null,
  username: null,
  email: null,
  lastLogin: null,
  photoUrl: null,
  settings: null
})

const received = (state, action) =>
state.merge({
  uid: action.user.uid,
  username: action.user.displayName,
  email: action.user.email,
  lastLogin: action.user.lastLogin,
  registered: action.user.registered,
  photoUrl: action.user.photoUrl,
  settings: action.settings
})

const ACTION_HANDLERS = {
  [Types.USER_RECEIVED]: received
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
