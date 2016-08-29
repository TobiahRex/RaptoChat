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

class RegisterScreen extends React.Component {

  static propTypes = {
    loginScreen: PropTypes.func
  }

  constructor(props, context) {

    super(props, context);

    this.state = {
      email: '',
      password: '',
      passwordVerify: '',
      visibleHeight: Metrics.screenHeight
    }
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
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

  setEmail (text){
    this.setState({ email: text })
  }

  setPassword (text){
    this.setState({ password: text })
  }

  confirmPassword (text){
    this.setState({ passwordVerify: text })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]}>

        <Text>Register</Text>

        <View>
          <Text style={styles.feedback} />

          <TextInput
            onChangeText={this.setEmail}
            placeholder='Email'
            style={styles.input}
            />
          <TextInput
            onChangeText={this.setPassword}
            placeholder='Password'
            style={styles.input}
            secureTextEntry
            />
          <TextInput
            onChangeText={this.confirmPassword}
            placeholder='Confirm Password'
            style={styles.input}
            secureTextEntry
            />

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

const mapDispatchToProps = (dispatch) => {
  return {
    loginScreen: NavigationActions.loginScreen
  }
}

export default connect(null, mapDispatchToProps)(RegisterScreen)
