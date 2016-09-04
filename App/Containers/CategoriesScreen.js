import React, {PropTypes} from 'react'
import {
  Alert,
  Image,
  Keyboard,
  LayoutAnimation,
  ListView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from '../I18n/I18n.js'
import styles from './Styles/ListviewGridExampleStyle'
import Actions from '../Actions/Creators'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'
// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'
import Voice from 'react-native-voice'
console.log('Voice: ', Voice)

const firebaseAuth = firebase.auth()

class CategoriesScreen extends React.Component {
  static propTypes = { }

  constructor(props) {
    super(props)

    let dataSource = [
      { title: 'Commute',
        key: 'commute',
        image: 'http://www.healthline.com/hlcmsresource/images/News/mental-health/022215-commute-thumb.jpg'
      },
      {
        title: 'Road Rage',
        key: 'rage',
        image: 'http://i.huffpost.com/gen/1482570/images/o-ROAD-RAGE-facebook.jpg'
      },
      {
        title: 'Road Trip',
        key: 'trip',
        image: 'http://getbg.net/upload/full/574017_povorot_polya_gorizont_zarya_nebo_mestnost_doroga__2048x1360_(www.GetBg.net).jpg'
      },
      {
        title: 'Music',
        key: 'music',
        image: 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAXpAAAAJDE0NWQ1ZmM2LTdkNTgtNGY0NC04MWM4LTg5OTQ2Yzk5NzJjMQ.jpg'
      },
      {
        title: 'Sports',
        key: 'sports',
        image: 'https://zeno-devlab.s3.amazonaws.com/16793/photo/image/1455747797'
      },
      {
        title: 'Technology',
        key: 'tech',
        image: 'http://images.dowjones.com/wp-content/uploads/sites/43/2015/10/11014854/Technology_CareersTeams_406x230.jpg'
      },
      {
        title: 'Nearby Users',
        key: 'nearby',
        image: 'http://media.gettyimages.com/videos/radar-screen-video-id102082578?s=640x640'
      }
    ]

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      dataSource: ds.cloneWithRows(dataSource),
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

  render () {
    return (
      <View style={styles.container}>

        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />

        <Text style={testStyle.welcome}>
          Welcome to React Native Voice!
        </Text>
        <Text style={testStyle.instructions}>
          Press the button and start speaking when you hear the beep.
        </Text>
        <Text
          style={testStyle.stat}>
          {`Started: ${this.state.started}`}
        </Text>
        <Text
          style={testStyle.stat}>
          {`Recognized: ${this.state.recognized}`}
        </Text>
        <Text
          style={testStyle.stat}>
          {`Pitch: ${this.state.pitch}`}
        </Text>
        <Text
          style={testStyle.stat}>
          {`Error: ${this.state.error}`}
        </Text>
        <Text
          style={testStyle.stat}>
          Results
        </Text>
        {this.state.results.map((result, index) => {
          return (
            <Text
              key={`result-${index}`}
              style={testStyle.stat}>
              {result}
            </Text>
          )
        })}
        <Text
          style={testStyle.stat}>
          Partial Results
        </Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text
              key={`partial-result-${index}`}
              style={testStyle.stat}>
              {result}
            </Text>
          )
        })}
        <Text
          style={testStyle.stat}>
          {`End: ${this.state.end}`}
        </Text>
        <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
          <Image
            style={testStyle.button}
            source={Images.button}
            />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
          <Text
            style={testStyle.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing.bind(this)}>
          <Text
            style={testStyle.action}>
            Cancel
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer.bind(this)}>
          <Text
            style={testStyle.action}>
            Destroy
          </Text>
        </TouchableHighlight>

      </View>
    )
  }
  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }
  onSpeechError(e) {
    this.setState({
      error: e.error,
    });
  }
  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }
  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }
  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }
  _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
    });
    const error = Voice.start('en');
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _stopRecognizing(e) {
    const error = Voice.stop();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _cancelRecognizing(e) {
    const error = Voice.cancel();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _destroyRecognizer(e) {
    const error = Voice.destroy();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  ////////////////////////////////////////////////////////////
  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <Image
          source={{ uri: rowData.image }}
          style={styles.imageStyle}
          />
        <Text style={styles.boldLabel}>{rowData.title}</Text>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen)


// TODO: mapStateToProps - Wingman - Messages - UserCommand

const testStyle = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
