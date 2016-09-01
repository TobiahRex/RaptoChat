import { combineReducers } from 'redux'
import auth from './LoginReducer'
import user from './UserReducer'
import active from './ActiveUsersReducer'
// import WeatherReducer from './WeatherReducer'

// glue all the reducers together into 1 root reducer
export default combineReducers({
  auth,
  user,
  active
})

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['auth', 'user', 'active']
// OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
// export const persistentStoreWhitelist = []
