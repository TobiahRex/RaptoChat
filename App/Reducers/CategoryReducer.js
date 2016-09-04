import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  category: null,
  category_messages: null,
  category_users: null,
})

const receivedMessages = (state, action) =>
state.merge({
  category_messages: action.messages
})

const receivedUsers = (state, action) =>
state.merge({
  category_users: action.users
})

const receivedActiveCategory = (state, action) =>
state.merge({ category: action.category })

const ACTION_HANDLERS = {
  [Types.CAT_MSGS_RECEIVED]: receivedMessages,
  [Types.CAT_USERS_RECEIVED]: receivedUsers,
  [Types.SET_ACTIVE_CATEGORY]: receivedActiveCategory
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
