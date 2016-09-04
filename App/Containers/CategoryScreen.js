import React, { PropTypes } from 'react'
import {
  ScrollView,
  Text,
  View
} from 'react-native'
import Actions from '../Actions/Creators'
import styles from './Styles/SettingsStyle'
import { connect } from 'react-redux'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'

class CategoryScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      que: this.props.que,
      old: this.props.old,
      category: this.props.category
    }
  }

  render () {
    return (
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleheigh}]}>

        <View style={styles.row}>
          <Text
            style={styles.rowLabel}>Category {this.state.category}</Text>
        </View>
      </ScrollView>
    )
  }
}
CategoryScreen.propTypes = {
  getAudio: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    category: state.activeCategory.category || 'Unknown',
    category_messages: state.activeCategory.category_messages,
    category_users: state.activeCategory.category_users,
    que: state.messages.que || 'empty',
    old: state.messages.old || 'empty',
    user_message: state.activeCategory.user_message,
    user_message_audio: state.activeCategory.user_message_audio,
    error: state.activeCategory.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAudio: (msg, msgVoice) => dispatch(Actions.getMsgAudio(msg, msgVoice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
