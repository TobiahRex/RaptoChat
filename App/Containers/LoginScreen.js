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
import {Images, Metrics} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'
import I18n from '../I18n/I18n.js'
const firebaseAuth = firebase.auth()
class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    attempting: PropTypes.bool,
    close: PropTypes.func,
    loginAttempt: PropTypes.func,
    loginSuccess: PropTypes.func,
    loginFailure: PropTypes.func,
    recievedUser: PropTypes.func,
    receivedActiveUsers: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      email: 'bob@bob.com',
      password: 'tobiah',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }
  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: { width: 100, height: 70 }
    })
  }
  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }
  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }
  handleChangePassword = (text) => {
    this.setState({ password: text })
  }
  handlePressLogin = () => {
    const { email, password } = this.state
    const activeRef = firebaseDB.ref('active');
    // sets store variable 'attempting' to 'true'
    this.props.loginAttempt()
    firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((fbUser) => {
      this.props.loginSuccess()
      firebaseDB.ref('users').child(fbUser.uid).once('value', (user) => {
        const key = activeRef.child(fbUser.uid).push({ login: Date.now()}).key

        activeRef.child(fbUser.uid).child(key).update({ key })
        .then(() => activeRef.once('value', (activeUsers) => {
          firebaseDB.ref('settings').child(fbUser.uid).once('value', (userSettings) => {
            const user = user.val()
            const settings = userSettings.val()
            const users = activeUsers.val()
            console.log('aaa user: ', user, '\nsettings: ', settings, '\nusers: ', users)
            this.props.loginSuccess(user, settings, users)
            // TODO change v this transition to "CATEGORIES" on final build.
            NavigationActions.settings()
          })
        }))
      })
    })
    .catch(err => {
      this.props.loginFailure()
      Alert.alert('Sign In Error', err.message)
      console.warn('Sign in FAILED: ', err.message)
    })
  }
  // handlePressLogin = () => {
  //   const { email, password } = this.state
  //   const activeRef = firebaseDB.ref('active');
  //   // sets store variable 'attempting' to 'true'
  //   this.props.loginAttempt()
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then((fbUser) => {
  //     this.props.loginSuccess()
  //     firebaseDB.ref('users').child(fbUser.uid).once('value', (user) => {
  //       const key = activeRef.child(fbUser.uid).push({ login: Date.now()}).key
  //
  //       activeRef.child(fbUser.uid).child(key).update({ key })
  //       .then(() => activeRef.once('value', (activeUsers) => {
  //         firebaseDB.ref('settings').child(fbUser.uid).once('value', (userSettings) => {
  //           const user = user.val()
  //           const settings = userSettings.val()
  //           const users = activeUsers.val()
  //           console.log('aaa user: ', user, '\nsettings: ', settings, '\nusers: ', users)
  //           this.props.loginSuccess(user, settings, users)
  //           // TODO change v this transition to "CATEGORIES" on final build.
  //           NavigationActions.settings()
  //         })
  //       }))
  //     })
  //   })
  //   .catch(err => {
  //     this.props.loginFailure()
  //     Alert.alert('Sign In Error', err.message)
  //     console.warn('Sign in FAILED: ', err.message)
  //   });
  // }
  render () {
    const { email, password } = this.state
    const { attempting } = this.props
    const editable = !attempting
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    console.log('Styles.textInput: ', Styles);
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>

        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('username')}</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={email}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangeEmail}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder={I18n.t('username')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              placeholder={I18n.t('password')} />
          </View>

          <View style={[Styles.loginRow]}>

            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
              </View>
            </TouchableOpacity>
            <Text>   </Text>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.props.close}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return { attempting: state.auth.attempting }
}
const mapDispatchToProps = (dispatch) => {
  return {
    close: NavigationActions.pop,
    loginAttempt: () => dispatch(Actions.loginAttempt()),
    loginSuccess: () => dispatch(Action.loginSuccess()),
    loginFailure: () => dispatch(Actions.loginFailure()),
    recievedUser: (user, settings) => dispatch(Actions.receivedUser(user, settings)),
    receivedActiveUsers: (users) => dispatch(Actions.receivedActiveUsers(users))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
