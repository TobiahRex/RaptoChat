import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  activeUsers: null
})

const received = (state, action) =>
state.merge(action.users)

const ACTION_HANDLERS = {
  [Types.ACTIVE_USERS_RECEIVED]: received
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
