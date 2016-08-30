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
const firebaseDB = firebase.firebaseDB()

// Perform Firebase Actions below this line.

firebaseDB.ref().once('value', (snapshot) => {
  console.log('Database: ', snapshot.val())
})

const activeUser = firebase.auth().currentUser
firebase.auth().signOut()
.then(() => {
  if (activeUser) {
    firebaseDB.ref('active').once('value', (dbData) => {
      let newActiveDB = Object.assign({}, dbData)
      newActiveDB = delete newActiveDB[activeUser.uid]
      firebaseDB.ref('active').update(newActiveDB)
    })
  }
})
.catch(err => console.error(err))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebaseDB.ref('active').child(user.uid).set(Date.now())
    .then(() => {
      setUserListener()
      setSettingsListener()
      dispatch({
        type: Types.AUTH_CHANGE,
        email: user.email,
        uid: user.uid
      })
    })
    .catch((err) => console.error('Could not add user to Active list.', err.message))
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
