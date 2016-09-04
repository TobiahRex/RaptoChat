import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import {
  ScrollView,
  Text
} from 'react-native'

class RecordMessage extends React.Component {
  constructor (props) {
    super(props)

  }
  render () {
    return (
      <ScrollView>
        <Text>Record Message</Text>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user_message: state.activeCategory.user_message,
    user_message_audio: state.activeCategory.user_message_audio
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAudio: (msg, msgVoice) => dispatch(Actions.getAudioMsg(msg, msgVoice))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordMessage)
