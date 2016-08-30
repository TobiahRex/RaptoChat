import React, { PropTypes } from 'React'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyle'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics } from '../Themes'
import I18n from '../I18n/I18n.js'

class RegisterScreen extends React.Component {

  static propTypes = {
    loginScreen: PropTypes.func,
    attempting: PropTypes.bool,
  }

  constructor(props, context) {

    super(props, context);

    this.state = {
      email: '',
      password: '',
      passwordVerify: '',
      visibleHeight: Metrics.screenHeight
    }
    this.isAttempting = false;
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

  setEmail = (text) => {
    this.setState({ email: text })
  }

  setPassword = (text) => {
    this.setState({ password: text })
  }

  confirmPassword = (text) => {
    this.setState({ passwordVerify: text })
  }

  handleRegister = () => {
    const { email, password, passwordVerify } = this.state
    this.isAttempting = true;

    if (password !== passwordVerify) {
      console.error('password do not match');
    } else {
      this.props.attemptRegister(email, password)
    }
  }

  render() {
    const { email, password, passwordVerify } = this.state
    const { attempting } = this.props
    const editable = !attempting
    const textInputStyle = editable ? styles.textInput : styles.textInputReadOnly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]}>

        <Text>Register</Text>

        <View style={styles.form}>
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
              returnKeyType='next'
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
              onPress={this.props.loginScreen}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>
                  Login
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
    close: NavigationActions.pop,
    loginScreen: NavigationActions.loginScreen,
    attemptRegister (email, password) {
      dispatch(Actions.attemptRegister(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
