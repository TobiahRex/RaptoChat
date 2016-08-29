import { Actions as NavigationACtions } from 'react-native-router-flux'
import { dispatch } from '../../index.android'
import Types from '../Actions/Types.js'
import * as firebase from 'firebase'


// Initialize Firebase
const config = {
  apiKey: "AIzaSyD0Nig7XcTpGY5KukFNR1cc3SWm_GvYXHs",
  authDomain: "raptochat-8b55b.firebaseapp.com",
  databaseURL: "https://raptochat-8b55b.firebaseio.com",
  storageBucket: "raptochat.appspot.com",
};

firebase.initializeApp(config);
const database = firebase.database();

function setUserListener() {
  database.ref('users').on('value', snapshot => {
    console.log('users: ', snapshot.val());
  })
}

export default database;
