import React, { PropTypes } from 'react'
import {
  ScrollView,
  View,
  Text
} from 'react-native'
import styles from './Styles/SettingsStyle'
import { connect } from 'react-redux'

class SettingsScreen extends React.Component {
  static propTypes = {

  }

  constructor (props, context) {
    super (props, context)

    this.state = {

    }
  }
  render () {
    return (
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]}>

      <View style={styles.row}>
        <Text style={styles.rowLabel} >Settings Component</Text>
      </View>
    </ScrollView>
    )
  }
}




const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
