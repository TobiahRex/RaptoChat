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
      msgVoice: 'willfromafar22k',
      user_message: this.props.user_message,
      user_message_audio: this.props.user_message_audio
    }
    Voice.onSpeechStart = this._onSpeechStart
    Voice.onSpeechRecognized = this._onSpeechRecognized
    Voice.onSpeechEnd = this._onSpeechEnd
    Voice.onSpeechError = this._onSpeechError
    Voice.onSpeechResults = this._onSpeechResults
    Voice.onSpeechPartialResults = this._onSpeechPartialResults
  }
  _getWebView = () => {
    if (this.state.user_message_audio) {
      return <WebView source={{uri: user_message_audio}} style={{marginTop: 20}} mediaPlaybackRequiresUserAction={false}  />
    } else {
      return <Text>Empty</Text>
    }
  }
  render () {
    return (
      <ScrollView>
        <Text>Record Message</Text>
        {this._getWebView}
      </ScrollView>
    )
  }
  _beginEvaluation = () => {
    let results = this.state.results[0] || this.partialResults[0] || ''
    this.setState({ msg: results })
    this.props.getAudioMsg(results, this.state.msgVoice)
  }
  _onSpeechStart = (e) => {
    this.setState({ started: true })
  }
  _onSpeechRecognized = (e) => {
    this.setState({ recognized: true })
  }
  _onSpeechEnd = (e) => {
    this.setState({ end: true })
  }
  _onSpeechError = (e) => {
    this.setState({ error: e.error })
    Alert.alert('Error', 'Sorry I could not recognize that option')
  }
  _onSpeechResults = (e) => {
    this.setState({ results: e.value })
  }
  _onSpeechPartialResults = (e) => {
    this.setState({ partialResults: e.value })
  }
  _startRecognizing = (e) => {
    this.beginEvaluation()
    this.setState({
      recognized: false,
      error: '',
      end: '',
      started: false,
      results: [],
      partialResults: [],
    })
    const error = Voice.start('en')
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    }
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
