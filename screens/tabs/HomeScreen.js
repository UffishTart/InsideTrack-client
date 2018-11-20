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

// create a component
class HomeScreen extends Component {
  state = {
    showSettings: false
  };

  toggleSettingsView = () =>
    this.setState({ showSettings: !this.state.showSettings });

  renderTouchSettings() {
    const settingsTent = this.state.showSettings
      ? this.renderSettings()
      : console.log("No settings!");
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.toggleSettingsView}
          >
            <View>{settingsTent}</View>
          </TouchableOpacity>
        </View>
        <View>
          {/* makeshift logout button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // onSignOut
              this.props.navigation.navigate("SignedOut");
            }}
          />
        </View>
      </View>
    );
  }

  renderSettings() {
    return <Settings onPress={this.toggleSettingsView.bind(this)} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>{this.renderTouchSettings()}</View>
        <View style={styles.container}>
          <Text>uuhhhhh</Text>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
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
