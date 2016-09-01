import React, { PropTypes } from 'React'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyle'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics } from '../Themes'
import I18n from '../I18n/I18n.js'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'
const firebaseAuth = firebase.auth()
class RegisterScreen extends React.Component {
  static propTypes = {
    loginScreen: PropTypes.func,
    attempting: PropTypes.bool,
    registerAttempt: PropTypes.func,
    registerSuccess: PropTypes.func,
    registerFailure: PropTypes.func,
    receivedUser: PropTypes.func,
    receivedActiveUsers: PropTypes.func
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: 'Tobiah Rex',
      email: 'bob@bob.com',
      password: 'tobiah',
      passwordVerify: 'tobiah',
      visibleHeight: Metrics.screenHeight
    }
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  keyboardDidShow = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({ visibleHeight: newSize })
  }
  keyboardDidHide = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ visibleHeight: Metrics.screenHeight })
  }
  setUsername = (text) => this.setState({ username: text })
  setEmail = (text) => this.setState({ email: text })
  setPassword = (text) => this.setState({ password: text })
  confirmPassword = (text) => this.setState({ passwordVerify: text })

  handleRegister = () => {
    const { email, password, passwordVerify } = this.state

    if (password === passwordVerify) {
      this.props.registerAttempt()
      firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.props.registerSuccess(newUser)
        newUser.updateProfile({ displayName: this.state.username })
      })
      .then(() => {
        let user = firebaseAuth.currentUser
        firebaseDB.ref('active').child(user.uid).set(Date.now())
        firebaseDB.ref(`settings/${user.uid}`).set({
          searchDistance: 10,
          distance: 'Mi.',
          favorites: 'empty',
          voice: 'empty',
        })
        firebaseDB.ref(`users/${user.uid}`).set({
          username: user.displayName,
          email: user.email,
          id: user.uid,
          photoUrl: user.photoUrl || 'http://iconizer.net/files/Impressions/orig/robot.png',
          lastLogin: Date.now()
        })
      })
      .then(() => {
        let user = firebaseAuth.currentUser
        firebaseDB.ref(`settings/${user.uid}`).once('value', (settingsSnap) => {
          firebaseDB.ref('active').once('value', (activeSnap) => {
            let settings = settingsSnap.val()
            let users = activeSnap.val()
            this.props.receivedActiveUsers(users)
            this.props.receivedUser(user, settings)
            NavigationActions.settings()
          })
        })
      })
      .catch((err) => {
        this.props.registerFailure()
        console.error('firebase Error: ', err.message);
        Alert.alert(`Register Error`, err.message)
      })
    } else {
      Alert.alert('Password Error', 'Passwords do not match.');
    }
  }
  render() {
    const { email, password, passwordVerify, username } = this.state
    const { attempting } = this.props
    const editable = !attempting
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]}>

        <Text>Register</Text>

        <View style={styles.form}>
          <View style={styles.row}>

            <Text style={styles.rowLabel}>
              Username
            </Text>

            <TextInput
              ref='username'
              placeholder='BobbaFett'
              onChangeText={this.setUsername}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onSubmitEditing={() => this.refs.email.focus()}
              style={styles.textInput}
              />
          </View>

          <View style={styles.row}>

            <Text style={styles.rowLabel}>
              Email
            </Text>

            <TextInput
              ref='email'
              placeholder='trex@tobiahrex.com'
              onChangeText={this.setEmail}
              value={email}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'

              onSubmitEditing={() => this.refs.password.focus()}
              style={styles.textInput}
              />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              {I18n.t('password')}
            </Text>
            <TextInput
              ref='password'
              placeholder='Password'
              onChangeText={this.setPassword}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onSubmitEditing={() => this.refs.passwordConfirm.focus()}
              secureTextEntry
              style={styles.textInput}
              />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Confirm Password
            </Text>

            <TextInput
              ref='passwordConfirm'
              placeholder='Password'
              onChangeText={this.confirmPassword}
              value={passwordVerify}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              onSubmitEditing={this.confirmPassword}
              secureTextEntry
              style={styles.textInput}
              />
          </View>

          <View style={styles.loginRow}>

            <TouchableOpacity style={styles.loginButtonWrapper}
              onPress={this.handleRegister} >
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>
                  Register
                </Text>
              </View>
            </TouchableOpacity>

            <Text>   </Text>

            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={this.props.close}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    attempting: state.auth.attempting
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    close: NavigationActions.pop,
    registerAttempt: () => dispatch(Actions.registerAttempt()),
    registerSuccess: (newUser) => dispatch(Actions.registerSuccess(newUser)),
    registerFailure: () => dispatch(Actions.registerFailure()),
    receivedUser: (user, settings) => dispatch(Actions.recievedUser(user, settings)),
    receivedActiveUsers: (users) => dispatch(Actions.receivedActiveUsers(users))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
