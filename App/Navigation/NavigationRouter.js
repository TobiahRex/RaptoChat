import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingsScreen from '../Containers/SettingsScreen'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>

        <Scene key='drawer' component={NavigationDrawer}>

          <Scene key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>

            <Scene initial
              key='presentationScreen'
              component={PresentationScreen}
              title='Ignite'
              renderLeftButton={NavItems.hamburgerButton} />

            <Scene key='login'
              component={LoginScreen}
              title='Login' />

            <Scene key='register'
              component={RegisterScreen}
              title='Register' />

            <Scene key='settings'
              component={SettingsScreen}
              title='Settings' />

          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
