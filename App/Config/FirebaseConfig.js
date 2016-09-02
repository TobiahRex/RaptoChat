import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { dispatch } from '../../index.android'
import firebase from 'firebase'
import Geofire from 'geofire'

const config = {
  apiKey: 'AIzaSyD0Nig7XcTpGY5KukFNR1cc3SWm_GvYXHs',
  authDomain: 'raptochat-8b55b.firebaseapp.com',
  databaseURL: 'https://raptochat-8b55b.firebaseio.com',
  storageBucket: 'raptochat-8b55b.appspot.com'
}
/*
// This is a Testing Databse config setup.
const config = {
apiKey: "AIzaSyD1k_WxJw-SauNB_e1ekJtBYrTfFht7Flc",
authDomain: "testfirebase-50970.firebaseapp.com",
databaseURL: "https://testfirebase-50970.firebaseio.com",
storageBucket: "testfirebase-50970.appspot.com",
};
*/
firebase.initializeApp(config)
const firebaseDB = firebase.database()


// get the current list of fb active users immediately on start up.
firebaseDB.ref('active').once('value', (snapshot) => {
  const users = snapshot.val()
  dispatch(Actions.receivedActiveUsers(users))
})

// TODO: Delete this active user check before deployment.
const activeUser = firebase.auth().currentUser
if (activeUser) {
  console.warn('User logged in: ', activeUser.uid)
} else {
  console.info('NO users logged in.')
}
// whenever a user log's in or log's out this will fire.
firebase.auth().onAuthStateChanged((user) => {
  console.log('authStateCHANGE: ', user)
  if (user) {
    setSettingsListener()
    setUserListener()
    setActiveUserListener()
  } else {
    NavigationActions.presentationScreen()
  }
})

function setSettingsListener () {
  firebaseDB.ref('settings').ref('users').on('child_added', snapshot => {
    const userSettings = snapshot.val()
    dispatch({ type: Types.USER_SETTINGS_RECEIVED, userSettings })
  })
}

function setUserListener (userID) {
  const id = userID
  firebaseDB.ref(`users/${id}`).on('child_added', snapshot => {
    const userUpdate = snapshot.val()
    dispatch({ type: Types.USER_UPDATES_RECEIVED, userUpdate })
  })
}
// mainly listens for other users logging in and notifies the store when triggered.
function setActiveUserListener () {
  console.warn('ACTIVE USER @ FirebaseConfig')
  firebaseDB.ref('active').on('value', (activeSnap) => {
    const users = activeSnap.val()
    dispatch({ type: Types.ACTIVE_USERS_RECEIVED, users })
  })
}

export {
  firebase,
  firebaseDB
}
