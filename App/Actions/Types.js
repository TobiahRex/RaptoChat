// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`
  STARTUP

  AUTH_CHANGE

  LOGIN_ATTEMPT
  LOGIN_SUCCESS
  LOGIN_FAILURE

  LOGOUT

  REGISTER_ATTEMPT
  REGISTER_SUCCESS
  REGISTER_FAILURE

  USER_SETTINGS_RECEIVED
  USER_UPDATES_RECEIVED

  ACTIVE_USERS_RECEIVED
`)
