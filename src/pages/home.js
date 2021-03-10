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
import { Icon } from "react-native-elements";
import News from "../components/news";
import LinearGradient from "react-native-linear-gradient";
import Card from "../components/card";
import { ScrollView } from "react-native-gesture-handler";
import Context from "../context/globalSettings";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const pages = [
  // { title: "Home", icon: "home", page: "Home" },
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
  news: [],
};
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }
  async getNews() {
    await fetch(Context._currentValue.ApiUrl + "/API/news/")
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        console.log(response);
        this.setState({ news: response });
      });
  }
  componentDidMount() {
    this.getNews();
  }
  render() {
    return (
      <SafeAreaView style={styles.page}>
        <LinearGradient style={styles.header} colors={["#662D91", "#93278F"]}>
          <Image
            source={require("../img/emotions.png")}
            style={{ height: "90%", width: "45%", marginTop: -20 }}
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              padding: 10,
              marginTop: -40,
            }}
          >
            We care about Your Health
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              padding: 10,
              marginTop: -20,
            }}
          >
            & Emotions
          </Text>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Login");
            AsyncStorage.setItem("isloggedIn", "false");
          }}
          style={styles.back_button}
        >
          <Icon
            name="logout"
            size={26}
            type="Ionicons"
            container
            color={"#ffffff"}
          />
        </TouchableOpacity>
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
        <ScrollView style={{ borderRadius: 25 }}>
          <FlatList
            data={this.state.news}
            renderItem={({ item }) => (
              <News title={item.title} body={item.body} url={item.url} />
            )}
            keyExtractor={(item) => item.pk}
            style={{
              alignSelf: "center",
              width: "95%",
            }}
            // extraData={selectedId}
          />
        </ScrollView>
        {/* <View style={styles.header}></View> */}
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  page: { backgroundColor: "#FCD6FB", height: "100%" },
  header: {
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(161, 50, 157,0.8)",
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 20,
    // justifyContent: 'center',
    alignItems: "center",
  },
  back_button: {
    margin: 10,
    top: 0,
    right: 0,
    width: 45,
    height: 45,
    position: "absolute",
    backgroundColor: "rgba(101, 27, 98,0.6)",
    borderRadius: 40,
    justifyContent: "center",
  },
});
