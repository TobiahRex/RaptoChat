import React from 'React'
import { View, Text } from 'react-native'
import styles from './Styles/LoginScreenStyle'

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}}
        style={[Styles.container, {height: this.state.visibleHeight}]}>

      <View style={styles.mainContainer}>
        <Text style={styles.feedback}>
          Register
        </Text>
      </View>
      
    </ScrollView>
    )
  }
}
<ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
  <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
  <View style={Styles.form}>
    <View style={Styles.row}>
      <Text style={Styles.rowLabel}>{I18n.t('username')}</Text>
      <TextInput
        ref='username'
        style={textInputStyle}
        value={username}
        editable={editable}
        keyboardType='default'
        returnKeyType='next'
        onChangeText={this.handleChangeUsername}
        underlineColorAndroid='transparent'
        onSubmitEditing={() => this.refs.password.focus()}
        placeholder={I18n.t('username')} />
    </View>

    <View style={Styles.row}>
      <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
      <TextInput
        ref='password'
        style={textInputStyle}
        value={password}
        editable={editable}
        keyboardType='default'
        returnKeyType='go'
        secureTextEntry
        onChangeText={this.handleChangePassword}
        underlineColorAndroid='transparent'
        placeholder={I18n.t('password')} />
    </View>

    <View style={[Styles.loginRow]}>

      <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
        <View style={Styles.loginButton}>
          <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.props.close}>
        <View style={Styles.loginButton}>
          <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
        </View>
      </TouchableOpacity>

    </View>
  </View>

</ScrollView>
