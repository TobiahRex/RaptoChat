import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'
import I18n from '../I18n/I18n.js'
const firebaseAuth = firebase.auth()

class CategoriesScreen extends React.Component {
  static propTypes = {

  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      // TODO
    }
  }
  componentWillMount () {
    // TODO get all Categories from firebase
  }
}

// TODO:
// TODO: Add Wingman to the store
// TODO: mapStateToProps - Wingman - Messages - UserCommand
