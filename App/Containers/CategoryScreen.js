import React, { PropTypes } from 'react'
import {
  ScrollView,
  Text,
  View
} from 'react-native'
import styles from './Styles/SettingsStyle'
import { connect } from 'react-redux'

class CategoryScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      que: this.props.messages.que || 'empty',
      old: this.props.messages.old || 'empty'
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

CategoryScreen.propTypes = {

}

const mapStateToProps = (state) => {
  console.info('category state: ', state)
  return {
    que: state.messages.que,
    old: state.messages.old
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
