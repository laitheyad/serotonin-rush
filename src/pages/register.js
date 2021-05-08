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
import { ScrollView } from "react-native-gesture-handler";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      f_name: "",
      l_name: "",
      b_day: "",
      email: "",
      phone: "",
      typing_username: false,
      typing_firstname: false,
      typing_lastname: false,
      typing_birthday: false,
      typing_email: false,
      typing_phone: false,
      typing_password: false,

      animation_register: new Animated.Value(width - 40),
      enable: true,
    };
  }

  _foucus(value) {
    if (value == "username") {
      this.setState({
        typing_username: true,
        typing_firstname: false,
        typing_lastname: false,
        typing_birthday: false,
        typing_email: false,
        typing_phone: false,
        typing_password: false,
      });
    } else if (value == "firstname") {
      this.setState({
        typing_username: false,
        typing_firstname: true,
        typing_lastname: false,
        typing_birthday: false,
        typing_email: false,
        typing_phone: false,
        typing_password: false,
      });
    } else if (value == "lastname") {
      this.setState({
        typing_username: false,
        typing_firstname: false,
        typing_lastname: true,
        typing_birthday: false,
        typing_email: false,
        typing_phone: false,
        typing_password: false,
      });
    } else if (value == "birthday") {
      this.setState({
        typing_username: false,
        typing_firstname: false,
        typing_lastname: false,
        typing_birthday: true,
        typing_email: false,
        typing_phone: false,
        typing_password: false,
      });
    } else if (value == "email") {
      this.setState({
        typing_username: false,
        typing_firstname: false,
        typing_lastname: false,
        typing_birthday: false,
        typing_email: true,
        typing_phone: false,
        typing_password: false,
      });
    } else if (value == "phone") {
      this.setState({
        typing_username: false,
        typing_firstname: false,
        typing_lastname: false,
        typing_birthday: false,
        typing_email: false,
        typing_phone: true,
        typing_password: false,
      });
    } else {
      this.setState({
        typing_username: false,
        typing_firstname: false,
        typing_lastname: false,
        typing_birthday: false,
        typing_email: false,
        typing_phone: false,
        typing_password: true,
      });
    }
  }

  _typing() {
    return <TypingAnimation dotColor="#93278f" style={{ marginRight: 25 }} />;
  }

  _animation() {
    Animated.timing(this.state.animation_register, {
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
  async _register() {
    let isloggedin = false;
    var formdata = new FormData();
    // formdata.append("username", this.state.username);
    // formdata.append("password", this.state.password);
    formdata.append("username", this.state.username);
    formdata.append("first_name", this.state.f_name);
    formdata.append("last_name", this.state.l_name);
    formdata.append("date_of_birth", this.state.b_day);
    formdata.append("phone", this.state.phone);
    formdata.append("email", this.state.email);
    formdata.append("status", "Customer");
    formdata.append("password", this.state.password);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      Context._currentValue.ApiUrl + "/API/register_user/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        console.log("response", result);
        let response = await JSON.parse(result);
        if (response.message === "success") {
          showMessage({
            message: "User Registered seccssfuly",
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
            message: "Ops",
            description: "Something went wrong",
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
        // console.log(response);
      })
      .catch((error) =>
        showMessage({
          message: "Ops",
          description: "Something went wrong",
          style: {
            backgroundColor: "#b038ac",
            textAlign: "center",
          },
          animated: true,
          floating: true,
          animationDuration: 280,
          position: "bottom",
        })
      );
    // console.log("key : ", await AsyncStorage.getItem("isloggedIn"));
    // console.log("username: ", this.state.username);
    // console.log("password: ", this.state.password);
    isloggedin ? this._animation() : 0;
    const { navigation } = this.props;
    navigation.addListener("willFocus", () =>
      this.setState({
        animation_register: new Animated.Value(width - 40),
        enable: true,
      })
    );
  }

  render() {
    const width = this.state.animation_register;
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
              Register to continute
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <ScrollView>
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
              first name
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your first name.."
                style={styles.textInput}
                onFocus={() => this._foucus("firstname")}
                onChangeText={(text) => this.setState({ f_name: text })}
              />
              {this.state.typing_firstname ? this._typing() : null}
            </View>

            <Text
              style={[
                styles.title,
                {
                  marginTop: 20,
                },
              ]}
            >
              last name
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your last name.."
                style={styles.textInput}
                onFocus={() => this._foucus("lastname")}
                onChangeText={(text) => this.setState({ l_name: text })}
              />
              {this.state.typing_lastname ? this._typing() : null}
            </View>

            <Text
              style={[
                styles.title,
                {
                  marginTop: 20,
                },
              ]}
            >
              Birthday
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your Birthday.."
                style={styles.textInput}
                onFocus={() => this._foucus("birthday")}
                onChangeText={(text) => this.setState({ b_day: text })}
              />
              {this.state.typing_birthday ? this._typing() : null}
            </View>

            <Text
              style={[
                styles.title,
                {
                  marginTop: 20,
                },
              ]}
            >
              E-mail
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your E-mail.."
                style={styles.textInput}
                onFocus={() => this._foucus("email")}
                onChangeText={(text) => this.setState({ email: text })}
              />
              {this.state.typing_email ? this._typing() : null}
            </View>

            <Text
              style={[
                styles.title,
                {
                  marginTop: 20,
                },
              ]}
            >
              Mobile Phone
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your Mobile Phone.."
                style={styles.textInput}
                onFocus={() => this._foucus("phone")}
                onChangeText={(text) => this.setState({ phone: text })}
              />
              {this.state.typing_phone ? this._typing() : null}
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

            <TouchableOpacity onPress={() => this._register()}>
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
                    <Text style={styles.textLogin}>Register</Text>
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
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={{ color: "black" }}>Already have account?</Text>
              <Text style={{ color: "blue" }}> Sign in?</Text>
            </TouchableOpacity>
          </ScrollView>
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
