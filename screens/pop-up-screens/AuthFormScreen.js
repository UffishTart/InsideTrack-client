import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../../store/user'
import { isSignedIn } from '../../navigation/AsyncStorageAuth'
// import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

export default class AuthFormScreen extends React.Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.emailHandleChange = this.emailHandleChange.bind(this)
    this.passwordHandleChange = this.passwordHandleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  emailHandleChange(text) {
    this.setState({
      email: text
    })
  }

  passwordHandleChange(text) {
    this.setState({
      password: text
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formType = this.props.name
    const email = this.state.email
    const password = this.state.password
    await this.props.auth(email, password, formType)
    const correctLogin = await isSignedIn()
    console.log('the call to isSignedIn in handleSubmit', correctLogin)
    correctLogin ?
      this.props.navigation.navigate('SignedIn') :
      this.props.navigation.navigate('SignedOut')
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
        <TouchableOpacity
          onPress={this.handleSubmit}
        // disabled={!this.state.email && !this.state.password}
        >
          <Text>{this.props.displayName}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

/**
 * Container: Two different higher order components depending on if the 
 * form is for login or signup. 
 */

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, formType) => dispatch(auth(email, password, formType))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthFormScreen)
export const Signup = connect(mapSignup, mapDispatch)(AuthFormScreen)