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
  ProgressBarAndroid,
} from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from '../I18n/I18n.js'
import styles from './Styles/CategoriesScreenStyle'
import Actions from '../Actions/Creators'
import { firebase, firebaseDB } from '../Config/FirebaseConfig'
// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'
import Voice from 'react-native-voice'

const firebaseAuth = firebase.auth()

class CategoriesScreen extends React.Component {
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
      recognized: false,
      pitch: '',
      error: '',
      end: false,
      started: false,
      results: [],
      partialResults: [],
    }
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechRecognized = this.onSpeechRecognized
    Voice.onSpeechEnd = this.onSpeechEnd
    Voice.onSpeechError = this.onSpeechError
    Voice.onSpeechResults = this.onSpeechResults
    Voice.onSpeechPartialResults = this.onSpeechPartialResults
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged
  }
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
  render () {
    return (
      <View style={styles.container}>

        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />

        <View style={styles.container}>
          <TouchableOpacity onPress={this._startRecognizing}>
            <Image
              style={styles.button}
              source={Images.button}
              />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  _beginEvaluation = () => {
    setTimeout(() => {
      let results = this.state.results[0] || this.state.partialResults[0] || 'results are empty'
      results = results.match(/commute|road rage|road trip|music|sports|technology|nearby users/gi)[0]

      switch(results) {
        case 'commute': {
          console.info('Ok Going to Commute')
          this.props.setActiveCategory('Commute')
          NavigationActions.activeCategory()
          break
        }
        case 'road rage': {
          console.info('Ok going to Road Rage')
          this.props.setActiveCategory('Road Rage')
          NavigationActions.activeCategory()
          break
        }
        case 'road trip': {
          console.info('Ok going to Road Trip')
          this.props.setActiveCategory('Road Trip')
          NavigationActions.activeCategory()
          break
        }
        case 'music': {
          console.info('Ok going to Music')
          this.props.setActiveCategory('Music')
          NavigationActions.activeCategory()
          break
        }
        case 'sports': {
          console.info('Ok going to sports')
          this.props.setActiveCategory('Sports')
          NavigationActions.activeCategory()
          break
        }
        case 'technology': {
          console.info('Ok going to technology')
          this.props.setActiveCategory('Technology')
          NavigationActions.activeCategory()
          break
        }
        case 'nearby users': {
          console.info('Ok going to nearby users')
          this.props.setActiveCategory('Nearby Users')
          NavigationActions.activeCategory()
          break
        }
        default: {
          console.error('Could not recognize that option')
          Alert.alert('Error','Sorry I could\'nt understand you. Please try again. ')
          break
        }
      }
    }, 5000)
  }

  onSpeechStart = (e) => {
    this.setState({
      started: true,
    })
  }
  onSpeechRecognized = (e) => {
    this.setState({
      recognized: true,
    })
  }
  onSpeechEnd = (e) => {
    this.setState({
      end: true,
    })
  }
  onSpeechError = (e) => {
    this.setState({
      error: e.error,
    })
    Alert.alert('Error: ', 'Sorry, I could not recognize that option')
  }
  onSpeechResults = (e) => {
    this.setState({
      results: e.value,
    })
  }
  onSpeechPartialResults = (e) => {
    this.setState({
      partialResults: e.value,
    })
  }
  onSpeechVolumeChanged = (e) => {
    this.setState({
      pitch: e.value,
    })
  }
  _startRecognizing = (e) => {
    this._beginEvaluation()
    this.setState({
      recognized: false,
      pitch: '',
      error: '',
      started: false,
      results: [],
      partialResults: [],
    })
  const error = Voice.start('en')
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    }
  }
  _stopRecognizing = (e) => {
    const error = Voice.stop()
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    }
  }
  _cancelRecognizing = (e) => {
    const error = Voice.cancel()
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    }
  }
  _destroyRecognizer = (e) => {
    const error = Voice.destroy()
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    }
  }
}
CategoriesScreen.propTypes = {
  setActiveCategory: PropTypes.func,
}
const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (category) => dispatch(Actions.setActiveCategory(category))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen)

// TODO: mapStateToProps - Wingman - Messages - UserCommand
