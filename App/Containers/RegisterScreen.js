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
import { firebase, database as firebaseDB } from '../Config/FirebaseConfig'

class RegisterScreen extends React.Component {

  static propTypes = {
    loginScreen: PropTypes.func,
    attempting: PropTypes.bool,
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
    this.isAttempting = false
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
    this.isAttempting = true;
    if (password === passwordVerify) {
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        newUser.updateProfile({ displayName: this.state.username })
        .then(() => {
          /*
          1) Get the current user we just created from firebase.
          2) Add that users id to the settings pool. We're going to adjust the settings for that user later in that location.
          3) add the user's id to the list of users on firebase that have registered.
          */
          let user = firebase.auth().currentUser;
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
          firebaseDB.ref('active').child(user.id).set(Date.now())
          .then(() => console.log('user added to active!!!!!'))
          .catch(err => console.error(err))
        })
        .catch(err => {
          console.error('firebase Error: ', err.message);
          Alert.alert(`Register Error`, err.message)
        })
      } else {
        Alert.alert('Password Error', 'Passwords do not match.');
      }
    }

    render() {
      console.log('Registration Component');
      const { email, password, passwordVerify, username } = this.state
      const { attempting } = this.props
      const editable = !attempting
      const textInputStyle = editable ? styles.textInput : styles.textInputReadOnly
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
                style={textInputStyle}
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
                style={textInputStyle}
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
                style={textInputStyle}
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
                style={textInputStyle}
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
      attempting: state.login.attempting
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      close: NavigationActions.pop
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
