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
    // this.setEmail = this.setEmail.bind(this);
    // this.setPassword = this.setPassword.bind(this);
    // this.confirmPassword = this.confirmPassword.bind(this);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyoardDidShowListener.remove()
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
              style={styles.input}
              secureTextEntry />
          </View>

          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.register} >
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.links}>
            <TouchableOpacity onPress={this.props.loginScreen}>
              <Text style={styles.link}> Log In </Text>
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
    loginScreen: NavigationActions.loginScreen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
