import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  user: null,
  settings: null
})

const received = (state, action) =>
state.merge({ user: action.user, settings: action.settings })

const ACTION_HANDLERS = {
  [Types.USER_RECEIVED]: received
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
