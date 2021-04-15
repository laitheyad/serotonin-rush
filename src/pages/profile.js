import React, { Component, createContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";
import common_styles from "../components/settings";
import { showMessage, hideMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import Context from "../context/globalSettings";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const defaultState = {
  typing_username: false,
  typing_password: false,
  animation_login: new Animated.Value(width - 40),
  enable: true,
  user_info: {
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    phone: "",
    avatar: "",
  },
  token: "",
};
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  _animation() {
    Animated.timing(this.state.animation_login, {
      toValue: 200,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      // setTimeout(() => {
      // this.props.navigation.navigate("Login");
      // this.setState({
      // ...defaultState,
      // });
      // }, 1500);
    });

    setTimeout(() => {
      this.setState({
        enable: false,
      });
    }, 150);
  }
  async _getInfo() {
    let user = await Context._currentValue.user_info;
    let username = await Context._currentValue.username;

    this.setState((prevState) => {
      let user_info = Object.assign({}, prevState.user_info);
      user_info.username = username;
      user_info.first_name = user.first_name;
      user_info.last_name = user.last_name;
      user_info.birthday = user.date_of_birth;
      user_info.email = user.email;
      user_info.phone = user.phone;
      user_info.avatar = user.avatar;
      return { user_info };
    });
    let token = Context._currentValue.token;
    this.setState({
      token: token,
      animation_login: new Animated.Value(width - 40),
      enable: true,
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => this._getInfo());
  }

  async _UpdateInfo() {
    var headers = new Headers();
    // console.log(this.state.token);
    headers.append("Authorization", "Token " + this.state.token);

    var formdata = new FormData();
    formdata.append("username", this.state.user_info.username);
    formdata.append("first_name", this.state.user_info.first_name);
    formdata.append("last_name", this.state.user_info.last_name);
    formdata.append("date_of_birth", this.state.user_info.birthday);
    formdata.append("email", this.state.user_info.email);
    formdata.append("phone", this.state.user_info.phone);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: headers,
      redirect: "follow",
    };

    await fetch(
      Context._currentValue.ApiUrl + "/API/update_info/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        if (response.message === "success") {
          this._animation();
        }
        // console.log(response);
      });
  }
  render() {
    const button_width = this.state.animation_login;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require("../img/header.png")}
            style={styles.imageBackground}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
              style={styles.back_button}
            >
              <Icon
                name="arrow-back"
                size={26}
                type="Ionicons"
                container
                color={"#ffffff"}
              />
            </TouchableOpacity>
          </ImageBackground>
          {/* <View
            style={{
              height: 200,
              // backgroundColor: "red",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Your Profile
            </Text>
            <LinearGradient
              style={{
                width: width + 400,
                // zIndex: 90,
                height: width + 500,
                // backgroundColor: "purple",
                // marginRight: -200,
                marginLeft: -190,
                // position: "absolute",
                borderRadius: 500,
                // borderBottomStartRadius: 1000,
                top: -(width + 150) - 160,
              }}
              colors={["#662D91", "#93278F"]}
            />
          </View> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
          style={styles.back_button}
        >
          <Icon
            name="arrow-back"
            size={26}
            type="Ionicons"
            container
            color={"#ffffff"}
          />
        </TouchableOpacity>
        <View style={styles.profile_container}>
          <View style={styles.avatar_container}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                top: -20,
              }}
            >
              Your Profile
            </Text>
            {this.state.user_info.avatar === null ? (
              <Image
                source={require("../img/def-profile.png")}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={{
                  uri:
                    Context._currentValue.ApiUrl + this.state.user_info.avatar,
                }}
                style={styles.avatar}
              />
            )}
            <View>
              <Text style={styles.Username}>Laith Al-Obaiyat</Text>
            </View>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >
              <LinearGradient
                style={{ borderRadius: 20, marginTop: -10 }}
                // colors={["rgba(161, 43, 157,0.9)", "rgba(201, 54, 197,0.9)"]}
                colors={["#ffffff", "#FFFFFF"]}
              >
                <View style={styles.info_card}>
                  <View style={styles.card_title_row_container}>
                    <Text style={styles.card_title}>First name</Text>
                    <View style={styles.card_title_container}>
                      <TextInput
                        style={styles.card_title_input}
                        placeholder={"First name"}
                        value={this.state.user_info.first_name}
                        onChangeText={(text) => {
                          this.setState((prevState) => ({
                            user_info: {
                              ...prevState.user_info,
                              first_name: text,
                            },
                          }));
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.card_title_row_container}>
                    <Text style={styles.card_title}>Last name</Text>
                    <View style={styles.card_title_container}>
                      <TextInput
                        style={styles.card_title_input}
                        placeholder={"Last name"}
                        value={this.state.user_info.last_name}
                        onChangeText={(text) => {
                          this.setState((prevState) => ({
                            user_info: {
                              ...prevState.user_info,
                              last_name: text,
                            },
                          }));
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.card_title_row_container}>
                    <Text style={styles.card_title}>Birthday</Text>
                    <View style={styles.card_title_container}>
                      <TextInput
                        style={styles.card_title_input}
                        placeholder={"Birthday"}
                        value={this.state.user_info.birthday}
                        onChangeText={(text) => {
                          this.setState((prevState) => ({
                            user_info: {
                              ...prevState.user_info,
                              birthday: text,
                            },
                          }));
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.card_title_row_container}>
                    <Text style={styles.card_title}>E-Mail</Text>
                    <View style={styles.card_title_container}>
                      <TextInput
                        autoCompleteType={"email"}
                        style={styles.card_title_input}
                        placeholder={"E-mail"}
                        value={this.state.user_info.email}
                        onChangeText={(text) => {
                          this.setState((prevState) => ({
                            user_info: {
                              ...prevState.user_info,
                              email: text,
                            },
                          }));
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.card_title_row_container}>
                    <Text style={styles.card_title}>Phone</Text>
                    <View style={styles.card_title_container}>
                      <TextInput
                        dataDetectorTypes={"phoneNumber"}
                        style={styles.card_title_input}
                        placeholder={"Phone number"}
                        value={this.state.user_info.phone}
                        onChangeText={(text) => {
                          this.setState((prevState) => ({
                            user_info: {
                              ...prevState.user_info,
                              phone: text,
                            },
                          }));
                        }}
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity onPress={() => this._UpdateInfo()}>
                  <View style={styles.button_container}>
                    <Animated.View
                      style={[
                        styles.animation,
                        {
                          width: button_width,
                        },
                      ]}
                    >
                      {this.state.enable ? (
                        <Text style={styles.textLogin}>Save</Text>
                      ) : (
                        <Animatable.View animation="bounceIn" delay={50}>
                          <FontAwesome name="check" color="white" size={20} />
                        </Animatable.View>
                      )}
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </KeyboardAvoidingView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  profile_container: {
    flex: 2,
    marginLeft: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  avatar_container: {
    alignItems: "center",
    top: "-29%",
    position: "absolute",
  },
  avatar: {
    borderRadius: 100,
    height: 150,
    width: 150,
    // borderWidth: 10,
    // borderColor: "rgba(101, 27, 98,0.6)",
  },
  Username: {
    margin: 5,
    fontSize: 20,
  },
  info_card: {
    width: width - 25,
    height: height / 2.5,
    borderRadius: 20,
    padding: 20,
  },
  card_title: {
    fontSize: 18,
    // color: "#ffffff",
    fontWeight: "bold",
    marginTop: 7,
  },
  card_title_input: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
    color: "#f4d7f3",
  },
  card_title_container: {
    backgroundColor: common_styles.colors.TextInputContainerColor,
    justifyContent: "center",
    height: 45,
    borderRadius: 10,
    // padding: 10,
    marginBottom: 8,
    width: width - 160,
    textAlign: "center",
    justifyContent: "center",
  },
  card_title_row_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back_button: {
    margin: 10,
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(101, 27, 98,0.6)",
    borderRadius: 40,
    justifyContent: "center",
  },
  animation: {
    backgroundColor: "#93278f",
    paddingVertical: 10,
    // marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
