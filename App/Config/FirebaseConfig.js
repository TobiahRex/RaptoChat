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
const database = firebase.database()

// Perform Firebase Actions below this line.

database.ref().once('value', (snapshot) => {
  console.log('Database: ', snapshot.val())
})

firebase.auth().signOut()
.then(() => {
  console.log('SIGN OUT SUCCESSFULL')
})
.catch(err => console.error(err))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    database.ref('active').child(user.id).set(Date.now())
    .then(() => {
      setUserListener()
      setSettingsListener()
      dispatch({ type: Types.AUTH_CHANGE,
        email: user.email,
        uid: user.uid })
    })
    .catch((err) => console.error('Could not add user to Active list.'))

  } else {
    NavigationActions.presentationScreen()
  }
})

function setSettingsListener () {
  database.ref('settings').ref('users').on('value', snapshot => {
    let userSettings = snapshot.val()
    console.log('userSettings: ', userSettings)
    dispatch({ type: Types.USER_SETTINGS_RECEIVED, userSettings })
  })
}

function setUserListener () {
  database.ref('users').on('value', snapshot => {
    let userUpdate = snapshot.val()
    console.log('users: ', userUpdate)
    dispatch({ type: Types.USER_UPDATES_RECEIVED, userUpdate })
  })
}

export {
  firebase,
  database
}
