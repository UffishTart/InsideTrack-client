import React from 'react'
import {View, Text, TextInput} from 'react-native'
// import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

export default class AuthForm extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.emailHandleChange = this.emailHandleChange.bind(this)
    this.passwordHandleChange = this.passwordHandleChange.bind(this)
  }

  emailHandleChange(event) {
    this.setState({
      email: event
    })
  }

  passwordHandleChange(event) {
    this.setState({
      password: event
    })
  }

  render() {
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          placeholder={'email'}
          value={this.state.email}
          onChangeText={this.emailHandleChange}
          keyboardType="email-address"
        />
        <Text>Password</Text>
        <TextInput
          placeholder={'password'}
          value={this.state.password}
          onChangeText={this.passwordHandleChange}
          keyboardType="default"
        />
      </View> 
    )
  }
}