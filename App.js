import React, { Component } from "react";
import { Text } from "react-native";
import Navigator from "./src/components/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAppContainer } from "react-navigation";
import Context from "./src/context/globalSettings";
import AnimatedSplash from "./src/components/animated-splash";
import { ModalPortal } from "react-native-modals";
export default class App extends React.Component {
  state = { signedin: false, isLoading: true, token: "" };
  async componentDidMount() {
    let isloggedIn = await AsyncStorage.getItem("isloggedIn");

    token = await AsyncStorage.getItem("token");

    this.setState({ signedin: isloggedIn, token: token });
    await this.get_info();
  }
  async get_info() {
    if (this.state.signedin === "true") {
      var formdata = new FormData();
      formdata.append("token", this.state.token);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      await fetch(
        Context._currentValue.ApiUrl + "/API/user_info/",
        requestOptions
      )
        .then((response) => response.text())
        .then(async (result) => {
          try {
            let response = await JSON.parse(result);
            if (response.message === "success") {
              await AsyncStorage.setItem(
                "isCustomer",
                response.user_obj.status
              );
              Context._currentValue.token = response.token;
              Context._currentValue.user_info = response.user_obj;
              Context._currentValue.username = response.username;
            } else {
              this.setState({ signedin: false });
            }
            setTimeout(() => {
              this.setState({ isLoading: false });
            }, 0);
          } catch (e) {
            this.props.navigation.navigate("Login");
          }
        });
    } else {
      this.setState({ isLoading: false });
    }
  }
  render() {
    const __Navigator = Navigator(this.state.signedin, this.state.isCustomer);
    const Nav = createAppContainer(__Navigator);
    return this.state.isLoading ? (
      <AnimatedSplash
        translucent={true}
        title={"Serotonin Rush"}
        subTitle={"Is Here to help you 🙈"}
        isLoaded={this.state.isLoading}
        logoImage={require("./src/img/logo.jpg")}
        backgroundColor={"#fea8f3"}
        logoHeight={400}
        logoWidth={400}
      />
    ) : (
      <>
        <ModalPortal />
        <Nav />
      </>
    );
  }
}
