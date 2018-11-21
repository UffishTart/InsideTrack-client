import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../../store/user'
import { isSignedIn } from '../../navigation/AsyncStorageAuth'
import { Font } from 'expo'
// import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

export default class AuthFormScreen extends React.Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: '',
      username: ''
    }
    this.emailHandleChange = this.emailHandleChange.bind(this)
    this.passwordHandleChange = this.passwordHandleChange.bind(this)
    this.usernameHandleChange = this.usernameHandleChange.bind(this)
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

  usernameHandleChange(text) {
    this.setState({
      username: text
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const formType = this.props.name
    const email = this.state.email
    const password = this.state.password
    const username = this.state.username
    await this.props.auth(email, password, formType, username)
    const correctLogin = await isSignedIn()
    console.log('the call to isSignedIn in handleSubmit', correctLogin)
    correctLogin ?
      this.props.navigation.navigate('SignedIn') :
      this.props.navigation.navigate('SignedOut')
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>EMAIL</Text>
          <TextInput
            placeholder={'email'}
            value={this.state.email}
            onChangeText={this.emailHandleChange}
            keyboardType="email-address"
          />
        </View>
        <View>
          <Text>PASSWORD</Text>
          <TextInput
            secureTextEntry={true}
            placeholder={'password'}
            value={this.state.password}
            onChangeText={this.passwordHandleChange}
            keyboardType="default"
          />
          {this.props.name === 'signup' && 
          <View>
            <Text>USERNAME</Text>
            <TextInput
              placeholder={'username'}
              value={this.state.username}
              onChangeText={this.usernameHandleChange}
              keyboardType="default"
            />
          </View>
          }
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fbff14'
  },
  emailContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  passwordContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
  },
});

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
    auth: (email, password, formType, username) => dispatch(auth(email, password, formType, username))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthFormScreen)
export const Signup = connect(mapSignup, mapDispatch)(AuthFormScreen)
