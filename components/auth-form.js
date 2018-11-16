// import React from 'react'
// import {View, Text, TextInput, TouchableOpacity} from 'react-native'
// import {connect} from 'react-redux'
// import {auth} from '../store/user'
// // import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

// export default class AuthForm extends React.Component {
//   constructor(){
//     super()
//     this.state = {
//       email: '',
//       password: ''
//     }
//     this.emailHandleChange = this.emailHandleChange.bind(this)
//     this.passwordHandleChange = this.passwordHandleChange.bind(this)
//   }

//   emailHandleChange(text) {
//     this.setState({
//       email: text
//     })
//   }

//   passwordHandleChange(text) {
//     this.setState({
//       password: text
//     })
//   }

//   render() {
//     return (
//       <View>
//         <Text>Email</Text>
//         <TextInput
//           placeholder={'email'}
//           value={this.state.email}
//           onChangeText={this.emailHandleChange}
//           keyboardType="email-address"
//         />
//         <Text>Password</Text>
//         <TextInput
//           placeholder={'password'}
//           value={this.state.password}
//           onChangeText={this.passwordHandleChange}
//           keyboardType="default"
//         />
//         <TouchableOpacity
//           onPress={(evt) => this.props.handleSubmit(evt, 
//             {
//               name: this.props.name,
//               email: this.state.email,
//               password: this.state.password
//             }
//           )}
//           // disabled={!this.state.email && !this.state.password}
//         >
//           <Text>{this.props.displayName}</Text>
//         </TouchableOpacity>
//       </View> 
//     )
//   }
// }

// /**
//  * Container: Two different higher order components depending on if the 
//  * form is for login or signup. 
//  */

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
//     handleSubmit(evt, infoObj) {
//       evt.preventDefault()
//       const formType = infoObj.name
//       const email = infoObj.email
//       const password = infoObj.password
//       dispatch(auth(email, password, formType))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * Add proptypes/look into form validation later
 */