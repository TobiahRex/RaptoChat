import Types from '../Actions/Types'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { dispatch } from '../../index.android'
import firebase from 'firebase'

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
const activeUser = firebase.auth().currentUser

// Perform Firebase Actions below this line.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    setSettingsListener()
    setUserListener()
  } else if (!activeUser) {
    firebaseDB.ref('active').once('value', (activeDB) => {
      let newActiveDB = Object.assign({}, activeDB.val())
      newActiveDB = delete newActiveDB[activeUser.uid]
      console.log('newActiveDB: ', newActiveDB)
      firebaseDB.ref('active').update(newActiveDB)
    })
  } else {
    NavigationActions.presentationScreen()
  }
})

function setSettingsListener () {
  firebaseDB.ref('settings').ref('users').on('value', snapshot => {
    let userSettings = snapshot.val()
    console.log('userSettings: ', userSettings)
    dispatch({ type: Types.USER_SETTINGS_RECEIVED, userSettings })
  })
}

function setUserListener () {
  firebaseDB.ref('users').on('value', snapshot => {
    let userUpdate = snapshot.val()
    console.log('users: ', userUpdate)
    dispatch({ type: Types.USER_UPDATES_RECEIVED, userUpdate })
  })
}

export {
  firebase,
  firebaseDB
}
