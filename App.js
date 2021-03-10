import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import Navigator from "./src/components/navigation";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";

export default class App extends React.Component {
  state = { signedin: false };
  async componentDidMount() {
    let isloggedIn = await AsyncStorage.getItem("isloggedIn");
    console.log("logg", isloggedIn);
    this.setState({ signedin: isloggedIn });
  }
  render() {
    const Nav = createAppContainer(Navigator(this.state.signedin));
    return <Nav />;
  }
}
