import { take, put, call } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

// attempts to login
export function * attemptLogin (password) {
  if (password === '') {
    yield put(Actions.loginFailure('EMPTY PASSWORD FIELD'))
  } else {
    yield put(Actions.attemptLogin())
  }
}

// a daemonized version which waits for LOGIN_ATTEMPT signals
export function * watchLoginAttempt () {
  // daemonize
  while (true) {
    // wait for LOGIN_ATTEMPT actions to arrive
    const { password } = yield take(Types.LOGIN_ATTEMPT)
    // call attemptLogin to perform the actual work
    yield call(attemptLogin, password)
  }
}
