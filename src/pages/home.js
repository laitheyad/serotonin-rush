import React, { Component, Fragment } from "react";
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
  FlatList,
  Animated,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Card from "../components/card";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const pages = [
  { title: "Home", icon: "home", page: "Home" },
  { title: "Profile", icon: "fingerprint", page: "Profile" },
  { title: "Add Meal", icon: "library-add", page: "AddMeal" },
  { title: "create Meal", icon: "set-meal", page: "CreateMeal" },
];
const defaultState = {
  typing_username: false,
  typing_password: false,
  animation_login: new Animated.Value(width - 40),
  enable: true,
  user_info: {
    username: "",
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
  rendercard = ({ item }) => {};
  render() {
    return (
      <SafeAreaView style={styles.page}>
        <LinearGradient style={styles.header} colors={["#662D91", "#93278F"]} />
        <View>
          <FlatList
            data={pages}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(item.page)}
              >
                <Card title={item.title} icon={item.icon} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            style={{
              alignSelf: "center",
              width: "95%",
            }}
            // extraData={selectedId}
          />
        </View>
        {/* <View style={styles.header}></View> */}
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  page: { backgroundColor: "#FCD6FB", height: "100%" },
  header: {
    width: "100%",
    height: "40%",
    backgroundColor: "rgba(161, 50, 157,0.8)",
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 20,
  },
});
