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
  TextInput,
  Animated,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Rating, AirbnbRating } from "react-native-ratings";
import AnimatedLoader from "react-native-animated-loader";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Context from "../context/globalSettings";
import { Icon } from "react-native-elements";
import common_styles from "../components/settings";
import DropdownAlert from "react-native-dropdownalert";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
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
  selectedItems: [
    {
      id: -1,
      name: "Choose your meal",
    },
  ],
  meals: [],
  rating: 0,
  isLoading: false,
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

  componentDidMount() {
    this._getMeals();
    // const { navigation } = this.props;
    // navigation.addListener("willFocus", () => this._getInfo());
  }

  async _Save() {
    let selected = this.state.selectedItems;
    let items = [];
    for (let i = 0; i < selected.length; i++) {
      await items.push(selected[i].id);
    }

    let header = new Headers();
    let form = new FormData();
    form.append("username", Context._currentValue.username);
    form.append("reaction", this.state.rating);
    var arr = await JSON.stringify(items);
    form.append("meals", arr);

    // header.append("Authorization", "Token " + Context._currentValue.token);
    var requestOptions = {
      method: "POST",
      // headers: header,
      body: form,
      redirect: "follow",
    };
    await fetch(
      Context._currentValue.ApiUrl + "/API/add_reaction/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        this.dropDownAlertRef.alertWithType(
          "success",
          "Success",
          "reaction saved & can't be modified"
        );
      });

    this._animation();
  }
  async _getMeals() {
    this.setState({ isLoading: true });
    var header = new Headers();
    header.append("Authorization", "Token " + Context._currentValue.token);
    var requestOptions = {
      method: "GET",
      headers: header,
      redirect: "follow",
    };
    await fetch(
      Context._currentValue.ApiUrl + "/API/all_meals/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        let array = [];
        for (let i = 0; i < response.length; i++) {
          array.push({ id: response[i].pk, name: response[i].name });
        }
        this.setState({ meals: array, isLoading: false });
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
            <TouchableOpacity
              onPress={() => {
                this._getMeals();
              }}
              style={styles.refresh_button}
            >
              <Icon
                name="refresh"
                size={26}
                type="Ionicons"
                container
                color={"#ffffff"}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <AnimatedLoader
          visible={this.state.isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../components/animation/lovely-loading.json")}
          speed={1}
        ></AnimatedLoader>
        <View style={styles.profile_container}>
          <View style={styles.avatar_container}>
            <Text
              style={{
                color: "white",
                // fontWeight: "bold",
                fontSize: 22,
                // top: -20,
                textAlign: "center",
                width: width - 20,
                maxHeight: 50,
              }}
            >
              Choose Your Meals & Enter The Rate of Your Emotional state
            </Text>

            <KeyboardAvoidingView
              // style={{ flex: 1 }}
              behavior="position"
              enabled
              keyboardVerticalOffset={-70}
            >
              <View style={styles.info_card}>
                <View style={{ width: "100%", marginBottom: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Select The meals that you have eaten this day
                  </Text>
                </View>
                <SearchableDropdown
                  multi={true}
                  selectedItems={this.state.selectedItems}
                  onItemSelect={(item) => {
                    let items = this.state.selectedItems;
                    items = this.state.selectedItems.filter(
                      (sitem) => sitem.id !== -1
                    );
                    items.push(item);
                    this.setState({ selectedItems: items });
                  }}
                  containerStyle={{
                    padding: 5,
                    backgroundColor: "rgba(101, 27, 98,0.2)",
                    borderRadius: 20,
                  }}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedItems.filter(
                      (sitem) => sitem.id !== item.id
                    );
                    if (items.length === 0) {
                      items.push({
                        id: -1,
                        name: "Choose your meal",
                      });
                    }
                    this.setState({ selectedItems: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: "#ddd",
                    borderColor: "#bbb",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{
                    color: "#222",
                  }}
                  itemsContainerStyle={{
                    maxHeight: 140,
                  }}
                  items={this.state.meals}
                  defaultIndex={2}
                  chip={true}
                  resetValue={false}
                  textInputProps={{
                    placeholder: "Choose your meal",
                    underlineColorAndroid: "transparent",
                    style: {
                      flex: 1,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "rgb(101, 27, 98)",
                      borderRadius: 5,
                    },
                    onTextChange: (text) => {},
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                <View style={{ width: "100%", marginTop: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    How did you felt at the end of the day ?
                  </Text>
                </View>
                <Rating
                  type="heart"
                  //   ratingCount={3}

                  imageSize={60}
                  showRating
                  onFinishRating={(rate) =>
                    this.setState({
                      rating: rate,
                    })
                  }
                />
                <TouchableOpacity onPress={() => this._Save()}>
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
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
        <DropdownAlert
          ref={(ref) => (this.dropDownAlertRef = ref)}
          successColor={"#b038ac"}
          successImageSrc={require("../img/check.png")}
        />
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
    // marginLeft: 10,
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
    // height: height / 2.5,
    marginTop: 80,
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
  refresh_button: {
    margin: 10,
    top: 0,
    right: 0,
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
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
