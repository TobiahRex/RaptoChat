import React from 'React'
import { View, Text, ScrollView } from 'react-native'
import Styles from './Styles/LoginScreenStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'

class RegisterScreen extends React.Component {

  static propTypes = {
    loginScreen: Proptypes.func
  }

  constructor(props, context) {

    super(props, context);

    this.state = {
      email: '',
      password: '',
      passwordVerify: ''
    }
    this.setEmail = this.setEmail.bind(this);
    this.setPassword1 = this.setPassword1.bind(this);
    this.setPassword2 = this.setPassword2.bind(this);
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
      <ScrollView style={styles.mainContainer}>
        <Text>Register</Text>
        <View style={styles.container}>
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.register}
          >
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.links}>
            <TouchableOpacity
              onPress={this.props.loginScreen}
            >
              <Text style={styles.link}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

mapDispatchToProps(dispatch) => {
  return {
    loginScreen: NavigationActions.loginScreen
  }
}

export default connect(null, mapDispatchToProps)(RegisterScreen)
