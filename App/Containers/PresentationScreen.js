import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
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
    login: PropTypes.func,
    register: PropTypes.func,
    settings: PropTypes.func,
  }

  logout = () => {
    const activeUser = firebase.auth().currentUser
    firebase.auth().signOut()
    .then(() => {
      console.log('You\'ve been signed out.')
      this.props.logoutUser()
    })
    .catch((err) => console.error('Could not sign out. ', err))

    firebaseDB.ref('active').once('value', (activeDB) => {
      let newActiveDB = Object.assign({}, activeDB.val())
      delete newActiveDB[activeUser.uid]
      firebaseDB.ref('active').set(newActiveDB)
      .catch((err) => console.error('Could not remove user from active list.', err))
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

          <RoundedButton onPress={this.props.login}>
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
    login: NavigationActions.login,
    register: NavigationActions.register,
    settings: NavigationActions.settings,
    logoutUser: () => dispatch({ type: Actions.logout }),
    logoutFailure: () => dispatch({ type: Actions.logoutFailure })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
