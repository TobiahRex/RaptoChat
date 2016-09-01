import React, {PropTypes} from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  Alert
} from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {
    loginScreen: PropTypes.func,
    register: PropTypes.func,
    settings: PropTypes.func,
    logoutUser: PropTypes.func,
    logoutFailure: PropTypes.func
  }

  logout = () => {
    const activeUser = firebase.auth().currentUser
    firebase.auth().signOut()
    .then(() => {
      console.info('You\'ve been signed out.')
      Alert.alert('Logged Out', 'You\'ve been successfully logged out.')
      this.props.logoutUser()
    })
    .catch((err) => {
      console.error('Could NOT sign out. ', err)
      Alert.alert('Fail to Log Out', `Could not log you out: ${err.message}`)
    })

    firebaseDB.ref('active').once('value', (activeDB) => {
      let newActiveDB = Object.assign({}, activeDB.val())
      delete newActiveDB[activeUser.uid]
      firebaseDB.ref('active').set(newActiveDB)
      .catch((err) =>
      console.error('Could not remove user from active list.', err))
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
        {/*<Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Default screens for development, debugging, and alpha testing
              are available below.
            </Text>
          </View>*/}

          <RoundedButton onPress={this.props.loginScreen}>
            Login
          </RoundedButton>

          <RoundedButton onPress={this.props.register}>
            Register
          </RoundedButton>

          <RoundedButton onPress={this.props.settings}>
            Settings
          </RoundedButton>

          <RoundedButton onPress={this.logout}>
            Logout
          </RoundedButton>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginScreen: NavigationActions.login,
    register: NavigationActions.register,
    settings: NavigationActions.settings,
    logoutUser: () => dispatch(Actions.logout()),
    logoutFailure: () => dispatch(Actions.logoutFailure())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
