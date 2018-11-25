import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import RacesScreen from '../screens/tabs/RacesScreen';
import PendingRacesScreen from '../screens/tabs/PendingRacesScreen';
import SingleRace from '../screens/pop-up-screens/SingleRace';
import { Login, Signup } from '../screens/pop-up-screens/AuthFormScreen';
import AuthFormSelect from '../components/AuthFormSelect';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons' //Need to install

const SignedOut = createStackNavigator({
  AuthFormSelect: {
    screen: AuthFormSelect,
    navigationOptions: {
      title: 'Welcome',
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
  SingleRace: {
    screen: SingleRace,
    navigationOptions: {
      title: 'Single Race',
    },
  },
});

const SignedIn = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Races: {
    screen: RacesScreen,
    navigationOptions: {
      tabBarLabel: 'My Races',
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'My Steed',
    },
  },
  PendingRaces: {
    screen: PendingRacesScreen,
    navigationOptions: {
      tabBarLabel: 'Pending Races',
    },
  },
});

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    }
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
