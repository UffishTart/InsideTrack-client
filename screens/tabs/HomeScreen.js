import React, { Component } from "react";
import { Constants, Ionicons } from "expo";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import AuthFormScreen, {
  Login,
  Signup
} from "../pop-up-screens/AuthFormScreen";
import { createStackNavigator } from "react-navigation";
import { Foundation } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Settings from "../pop-up-screens/Settings";
import { onSignOut } from "../../navigation/AsyncStorageAuth";
import StartNewRace from '../../components/StartNewRace'
// create a component
class HomeScreen extends Component {
  state = {
    showSettings: false,
    showNewRacePage: false
  };

  toggleSettingsView = () =>
    this.setState({ showSettings: !this.state.showSettings });

  toggleNewRaceView = () => 
    this.setState({ showNewRacePage: !this.state.showNewRacePage})

  renderTouchSettings() {
    const settingsTent = this.state.showSettings
      ? this.renderSettings()
      : console.log("No settings!");
    const newRaceTent = this.state.showNewRacePage ? this.renderNewRacePage() : null
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonSettings}
            onPress={this.toggleSettingsView}
          >
            <View>{settingsTent}</View>
          </TouchableOpacity>
        </View>
        <View>
          {/* makeshift logout button */}
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={() => {
              // onSignOut
              this.props.navigation.navigate("SignedOut");
            }}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.toggleNewRaceView}
          >
            <View>{newRaceTent}</View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderSettings() {
    return <Settings onPress={this.toggleSettingsView.bind(this)} />;
  }

  renderNewRacePage() {
    return <StartNewRace onPress={this.toggleNewRaceView.bind(this)} />
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>{this.renderTouchSettings()}</View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fbff14'
  },
  buttonSettings: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 100,
    marginLeft: 250,
    marginBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLogout: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 100,
    marginTop: 40,
    marginBottom: 80,
    marginLeft: 135,
    alignItems: 'center',
    flexDirection: 'row',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#2c3e50',
  // },
  // topBar: {
  //   flex: 1,
  //   // backgroundColor: 'transparent',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   // paddingTop: Constants.statusBarHeight / 2,
  // },
  // toggleButton: {
  //   flex: 0.25,
  //   height: 40,
  //   marginHorizontal: 2,
  //   marginBottom: 10,
  //   marginTop: 20,
  //   padding: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});

//make this component available to the app
export default HomeScreen;
