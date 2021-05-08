import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypingAnimation } from "react-native-typing-animation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import Context from "../context/globalSettings";
import DropdownAlert from "react-native-dropdownalert";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      typing_username: false,
      typing_password: false,
      animation_login: new Animated.Value(width - 40),
      enable: true,
    };
  }

  _foucus(value) {
    if (value == "username") {
      this.setState({
        typing_username: true,
        typing_password: false,
      });
    } else {
      this.setState({
        typing_username: false,
        typing_password: true,
      });
    }
  }

  _typing() {
    return <TypingAnimation dotColor="#93278f" style={{ marginRight: 25 }} />;
  }

  _animation() {
    Animated.timing(this.state.animation_login, {
      toValue: 40,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        this.props.navigation.navigate("MainNavigator");
      }, 1500);
    });

    setTimeout(() => {
      this.setState({
        enable: false,
        typing_username: false,
        typing_password: false,
      });
    }, 150);
  }
  async componentDidMount() {}
  async _login() {
    let isloggedin = false;
    var formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("password", this.state.password);
    // formdata.append("username", "admin");
    // formdata.append("password", "admin@31");
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    await fetch(Context._currentValue.ApiUrl + "/API/login/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);

        if (response.message === "success") {
          isloggedin = true;
          await AsyncStorage.setItem("isloggedIn", "true");

          await AsyncStorage.setItem("token", response.token);

          await AsyncStorage.setItem("isCustomer", response.user_obj.status);
          Context._currentValue.token = response.token;
          Context._currentValue.user_info = response.user_obj;
          Context._currentValue.username = response.username;
          showMessage({
            message: "Logged in seccessfuly",
            style: {
              backgroundColor: "#b038ac",
              textAlign: "center",
            },
            animated: true,
            floating: true,
            animationDuration: 280,
          });
        } else {
          showMessage({
            message: "Wrong Credentials",
            description: "Incorrect Username or Password",
            style: {
              backgroundColor: "#b038ac",
              textAlign: "center",
            },
            animated: true,
            floating: true,
            animationDuration: 280,
            position: "bottom",
          });
        }
      })
      .catch((error) => console.log("error", error));
    isloggedin ? this._animation() : 0;
    const { navigation } = this.props;
    navigation.addListener("willFocus", () =>
      this.setState({
        animation_login: new Animated.Value(width - 40),
        enable: true,
      })
    );
  }

  render() {
    const width = this.state.animation_login;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require("../img/header.png")}
            style={styles.imageBackground}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Welcome Back To
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Serotonin Rush
            </Text>
            <Text
              style={{
                color: "yellow",
              }}
            >
              Sign in to continute
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <Text
            style={[
              styles.title,
              {
                marginTop: 50,
              },
            ]}
          >
            Username
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your username.."
              style={styles.textInput}
              onFocus={() => this._foucus("username")}
              onChangeText={(text) => this.setState({ username: text })}
            />
            {this.state.typing_username ? this._typing() : null}
          </View>

          <Text
            style={[
              styles.title,
              {
                marginTop: 20,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <TextInput
              secureTextEntry
              placeholder="Your password.."
              style={styles.textInput}
              onFocus={() => this._foucus("password")}
              onChangeText={(text) => this.setState({ password: text })}
            />
            {this.state.typing_password ? this._typing() : null}
          </View>

          <TouchableOpacity onPress={() => this._login()}>
            <View style={styles.button_container}>
              <Animated.View
                style={[
                  styles.animation,
                  {
                    width,
                  },
                ]}
              >
                {this.state.enable ? (
                  <Text style={styles.textLogin}>Login</Text>
                ) : (
                  <Animatable.View animation="bounceIn" delay={50}>
                    <FontAwesome name="check" color="white" size={20} />
                  </Animatable.View>
                )}
              </Animated.View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <Text style={{ color: "black" }}>New user?</Text>
            <Text style={{ color: "blue" }}> Sign up?</Text>
          </TouchableOpacity>
        </View>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
        <FlashMessage position="top" />
      </View>
    );
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    padding: 20,
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
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: "gray",
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    backgroundColor: "#93278f",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
