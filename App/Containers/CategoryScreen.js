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

}

const mapStateToProps = (state) => {
  return {
    category: state.activeCategory.category || 'unkown',
    que: state.messages.que || 'empty',
    old: state.messages.old || 'empty'
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
