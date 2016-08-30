import React, { PropTypes } from 'react'
import styles from './Styles/SettingsStyle'

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
      <View>
        <Text style={styles.rowLabel} >Settings Component</Text>
      </View>
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
