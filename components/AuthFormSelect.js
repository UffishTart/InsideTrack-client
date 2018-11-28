import React, { Component } from "react";
import { Button } from "../node_modules/react-native-elements";
import { View } from "react-native";
export default class AuthFormSelect extends Component {
  render() {
    return (
      <View>
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}
