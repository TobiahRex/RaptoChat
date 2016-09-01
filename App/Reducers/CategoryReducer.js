import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  category_messages:
  category_users:
})

const receivedMessages = (state, action) => {

  state({
    category_messages: action.messages
  })
}

const receivedUsers = (state, action) =>
state({
  category_users: action.users
})

const ACTION_HANDLERS = {
  [Types.CAT_MSGS_RECEIVED]: receivedMessages,
  [Types.CAT_USERS_RECEIVED]: receivedUsers
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
