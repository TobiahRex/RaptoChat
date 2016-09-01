import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxSauce'

export const INITIAL_STATE = Immutable({
  oor: null,
  old: null,
  que: null
})

const received = (state, action) => {
  let messages = Object.assign({}, action.messages)
}


export const ACTION_HANDLERS = {
  [Types.receivedMessages]: receivedMessages,
  [Types.receivedNewMessage]: receivedNewMessage,
}
