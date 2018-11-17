import { AsyncStorage } from "react-native"

export const onSignIn = user => {
  AsyncStorage.setItem('USER_KEY', JSON.stringify(user.id))
}

export const onSignOut = () => AsyncStorage.removeItem('USER_KEY')

export const isSignedIn = async () => {
  try {
    const res = await AsyncStorage.getItem('USER_KEY')

    return res ? true : false
  } catch(err) {
    console.log(err)
  }
}