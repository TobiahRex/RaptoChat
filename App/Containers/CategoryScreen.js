import React, { PropTypes } from 'react'
import {
  ScrollView,
  Text,
  View
} from 'react-native'
import styles from './Styles/SettingsStyle'
import { connect } from 'react-redux'

class SettingsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      que: this.props.messages.que,
      old: this.props.messages.old
    }
  }

  render () {
    return (
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleheigh}]}>

        <View style={styles.row}>
          <Text
            style={styles.rowLabel}>Category</Text>
        </View>
      </ScrollView>
    )
  }
}

SettingsScreen.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    que: state.messages.que,
    old: state.messages.old
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
