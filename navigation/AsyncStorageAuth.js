import { AsyncStorage } from "react-native"

export const onSignIn = user => {
  AsyncStorage.setItem('USER_TOKEN', JSON.stringify(user.id))
}

export const onSignOut = () => AsyncStorage.removeItem('USER_TOKEN')

export const isSignedIn = async () => {
  try {
    const res = await AsyncStorage.getItem('USER_TOKEN')

    return res ? true : false
  } catch(err) {
    console.log(err)
  }
}