import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../store'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class AuthFormScreen extends Component {
  constructor() {
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
      <View style={styles.container}>
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
          onPress={this.props.handleSubmit}
          disabled={!this.state.email && !this.state.password}
        >{this.props.displayName}
        </TouchableOpacity>
      </View>
    )
  }
}

/**
 * Container: Two different higher order components depending on if the 
 * form is for login or signup. 
 */

// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formType = this.props.name
//       const email = this.state.email
//       const password = this.state.password
//       dispatch(auth(email, password, formType))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Add proptypes/look into form validation later
 */