import { Actions as NavigationActions } from 'react-native-router-flux'
import { dispatch } from '../../index.android'
import Types from '../Actions/Types.js'
import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD0Nig7XcTpGY5KukFNR1cc3SWm_GvYXHs",
  authDomain: "raptochat-8b55b.firebaseapp.com",
  databaseURL: "https://raptochat-8b55b.firebaseio.com",
  storageBucket: "raptochat-8b55b.appspot.com",
};
// const config = {
//   apiKey: "AIzaSyD1k_WxJw-SauNB_e1ekJtBYrTfFht7Flc",
//   authDomain: "testfirebase-50970.firebaseapp.com",
//   databaseURL: "https://testfirebase-50970.firebaseio.com",
//   storageBucket: "testfirebase-50970.appspot.com",
// };
// Perform Firebase Actions below this line.

firebase.initializeApp(config);
const database = firebase.database();

// database.ref().child('users').push({yo: 'something here'})
// .then(stuff => {
//   console.log('push stuff: ', stuff);
// })
// .catch(err => {
//   console.error('err: ', err);
// })

database.ref().once('value', (snapshot) => {
  console.log('snapshot: ', snapshot.val());
});



firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('USER CHANGED: ', user);
    console.log('');
    dispatch({ type: Actions.LOGIN_SUCCESS, user });
    setUserListener();
    setSettingsListener();
  } else {
    NavigationActions.presentationScreen();
  }
})


function setSettingsListener () {
  database.ref('settings').ref('users').on('value', snapshot => {
    let userSettings = snapshot.val();
    console.log('userSettings: ', userSettings);
    dispatch({ type: Actions.USER_SETTINGS_RECEIVED, userSettings });
  });
}

function setUserListener() {
  database.ref('users').on('value', snapshot => {
    let userUpdate = snapshot.val();
    console.log('users: ', userUpdate);
    dispatch({ type: Actions.USER_UPDATES_RECEIVED, userUpdates });
  });
}

export {
  firebase,
  database
}
