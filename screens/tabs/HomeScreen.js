import React, { Component } from "react";
import { Font } from "expo";
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from "react-native";
import Settings from "../pop-up-screens/Settings";
import StartNewRace from '../../components/StartNewRace'
import { me, authWithToken, logout } from "../../store/user";
import { isSignedIn } from "../../navigation/AsyncStorageAuth"
import { connect } from "react-redux";
import axios from 'axios'

// create a component
class HomeScreen extends Component {
  state = {
    showSettings: false,
    fontLoaded: false,
    showNewRacePage: false
  };

  async componentDidMount() {
    console.log('homescreen mounted')
    await this.props.getUser()
    if ((!this.props.user.length) && isSignedIn()) {
      const token = await AsyncStorage.getItem('USER_TOKEN') 
      await this.props.reLogin(Number(token))
      await this.props.getUser()
    }
    console.log('the user on state:', this.props.user)
    await Font.loadAsync({
      'FasterOne-Regular': require('../../assets/FasterOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  toggleSettingsView = () => {
    this.setState({ showSettings: !this.state.showSettings })
  }

  toggleNewRaceView = () =>
    this.setState({ showNewRacePage: !this.state.showNewRacePage })

  renderTouchSettings() {
    const settingsTent = this.state.showSettings
      ? this.renderSettings()
      : null
    const newRaceTent = this.state.showNewRacePage
      ? this.renderNewRacePage()
      : null
    return (
      <View>
        <View>
          <TouchableOpacity
            style={styles.buttonSettings}
            onPress={this.toggleSettingsView}
          >
            {this.state.fontLoaded ? (
              <Text style={styles.text}>*</Text>)
              : null}
            <View>{settingsTent}</View>
          </TouchableOpacity>
        </View>
        <View marginTop={-50}>
          <View>
            <Image style={styles.logo} source={require('../../assets/InsideTrackLogo.png')}></Image>
          </View>
          {/* <View>
          {this.state.fontLoaded ? (
            <Text style={styles.text}>Hello, {this.props.user.name}</Text>)
            : null}
        </View> */}
          <View>
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={() => {
                // onSignOut
                this.props.logout()
                this.props.navigation.navigate("SignedOut");
              }}>
              {this.state.fontLoaded ? (
                <Text style={styles.text}>Log Out</Text>)
                : null}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.buttonNewRace}
              onPress={this.toggleNewRaceView}
            >
              {this.state.fontLoaded ? (
                <Text style={styles.text}>Add Race</Text>)
                : null}
              <View>{newRaceTent}</View>
            </TouchableOpacity>
          </View>
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
  border: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: '#fff',
    borderTopWidth: 50,
    borderRadius: 2,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fbff14'
  },
  buttonSettings: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 3, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 40,
    width: 40,
    marginLeft: 350,
    marginTop: 300,
    borderColor: '#fbff14',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonNewRace: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 200,
    marginLeft: 1,
    marginTop: -600,
    marginBottom: 500,
    borderColor: '#fbff14',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLogout: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 3, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 100,
    marginTop: -300,
    marginBottom: 80,
    marginLeft: 175,
    borderColor: '#fbff14',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 15,
    fontStyle: 'italic'
  },
  logo: {
    shadowOffset: { height: 4, width: 4 }, // IOS
    height: 450,
    width: 450,
    marginBottom: 250
  },
});

//make this component available to the app

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    reLogin: token => dispatch(authWithToken(token)),
    logout: () => dispatch(logout())
  };
};


export default connect(mapState, mapDispatch)(HomeScreen)
