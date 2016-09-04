import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import {
  ScrollView,
  Text
} from 'react-native'
import Voice from 'react-native-voice'

class RecordMessage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      msg: '',
      msgVoice: 'willbadguy22k'
      user_message: this.props.user_message,
      user_message_audio: this.props.user_message_audio
    }
    Voice.onSpeechStart = this._onSpeechStart
    Voice.onSpeechRecognized = this._onSpeechRecognized
    Voice.onSpeechEnd = this._onSpeechEnd
    Voice.onSpeechError = this._onSpeechError
    Voice.onSpeechResults = this._onSpeechResults
    Voice.onSpeechPartialResults = this._onSpeechPartialResults
    Voice.onSpeechVolumeChanged = this._onSpeechVolumeChanged
  }
  render () {
    return (
      <ScrollView>
        <Text>Record Message</Text>
      </ScrollView>
    )
  }
  _onSpeechStart = (e) => {
    this.setState({
      start: true,
      results: [],
      partialResults: [],
    })
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
