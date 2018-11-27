import React, { Component } from 'react';
import { Font } from 'expo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import Settings from '../pop-up-screens/Settings';
import StartNewRace from '../../components/StartNewRace';
import { me, authWithToken, logout } from '../../store/user';
import { isSignedIn } from '../../navigation/AsyncStorageAuth';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';

// create a component
class HomeScreen extends Component {
  state = {
    showSettings: false,
    fontLoaded: false,
    showNewRacePage: false,
  };

  async componentDidMount() {
    await this.props.getUser();
    if (!this.props.user.length && isSignedIn()) {
      const token = await AsyncStorage.getItem('USER_TOKEN');
      await this.props.reLogin(Number(token));
      await this.props.getUser();
    }
    await Font.loadAsync({
      'FasterOne-Regular': require('../../assets/FasterOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  toggleSettingsView = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  toggleNewRaceView = () =>
    this.setState({ showNewRacePage: !this.state.showNewRacePage });

  renderTouchSettings() {
    const settingsTent = this.state.showSettings ? this.renderSettings() : null;
    const newRaceTent = this.state.showNewRacePage
      ? this.renderNewRacePage()
      : null;
    return (
      <Container style={{ backgroundColor: '#fbff14' }}>
        <Header />
        <Body
          style={{
            justifyContent: 'center',
            backgroundColor: '#fbff14',
            marginBottom: 50,
          }}
        >
          <Container
            style={{
              backgroundColor: '#fbff14',
              justifyContent: 'center',
              marginLeft: 230,
              marginTop: 20,
            }}
          >
            <Button
              style={styles.buttonSettings}
              onPress={this.toggleSettingsView}
            >
              {/* {this.state.fontLoaded ? <Text style={styles.text}>*</Text> : null} */}
              <View>{settingsTent}</View>
            </Button>
          </Container>
          <Body
            style={{
              justifyContent: 'center',
              backgroundColor: '#fbff14',
              marginTop: 30,
            }}
          >
            <Image
              style={styles.logo}
              source={require('../../assets/InsideTrackLogo.png')}
            />
          </Body>
          <Container
            style={{
              backgroundColor: '#fbff14',
              justifyContent: 'center',
              marginTop: 150,
            }}
          >
            <Content>
              <Button
                light
                style={styles.buttonNewRace}
                onPress={this.toggleNewRaceView}
              >
                {this.state.fontLoaded ? (
                  <Text style={styles.text}>Add Race</Text>
                ) : null}
                <View>{newRaceTent}</View>
              </Button>
            </Content>
          </Container>
          <Container
            style={{
              backgroundColor: '#fbff14',
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Content>
              <Button
                light
                style={styles.buttonLogout}
                onPress={() => {
                  // onSignOut
                  this.props.logout();
                  this.props.navigation.navigate('SignedOut');
                }}
              >
                {this.state.fontLoaded ? (
                  <Text style={styles.text}>Log Out</Text>
                ) : null}
              </Button>
            </Content>
          </Container>
        </Body>
      </Container>
    );
  }

  renderSettings() {
    return <Settings onPress={this.toggleSettingsView.bind(this)} />;
  }

  renderNewRacePage() {
    return <StartNewRace onPress={this.toggleNewRaceView.bind(this)} />;
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
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderTopWidth: 50,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fbff14',
  },
  buttonSettings: {
    // shadowColor: "rgba(0,0,0, .4)", // IOS
    // shadowOffset: { height: 3, width: 3 }, // IOS
    // shadowOpacity: 1, // IOS
    // shadowRadius: 1, //IOS
    backgroundColor: '#fbff14',
    // elevation: 2, // Android
    height: 40,
    width: 40,
  },
  buttonNewRace: {
    alignContent: 'center',
    position: 'relative',
    justifyContent: 'center',
    height: 50,
    width: 200,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  buttonLogout: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 3, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    height: 50,
    width: 100,
    alignContent: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 15,
    fontStyle: 'italic',
  },
  logo: {
    shadowOffset: { height: 4, width: 4 }, // IOS
    height: 450,
    width: 450,
    marginBottom: -150,
    alignContent: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
});

//make this component available to the app

const mapState = state => {
  return {
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    reLogin: token => dispatch(authWithToken(token)),
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapState,
  mapDispatch
)(HomeScreen);
