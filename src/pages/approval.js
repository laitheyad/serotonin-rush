/** @format */

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  RefreshControl,
  Modal,
  Image,
} from "react-native";
import Context from "../context/globalSettings";
import { Icon } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";
// import { Modal, ModalContent,ModalTitle,SlideAnimation } from 'react-native-modals';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";

import MealtItem from "../components/mealsItem";
import { ScrollView } from "react-native-gesture-handler";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const defaultState = {
  typing_username: false,
  typing_password: false,
  animation_login: new Animated.Value(width - 40),
  enable: true,
  meal_info: {
    meal_name: "",
    fats: "",
    protein: "",
    Carbohydrate: "",
    email: "",
    calories: "",
    recipe: "",
  },
  token: "",
  selected_meal: {},
  modal_visiblity: false,
  isRefresh: false,
  isLoading: false,
  isEmpty: false,
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }
  componentDidMount() {
    this._getInfo();
  }
  async _changeMealStatus(state) {
    this.setState({ isLoading: true });

    let header = new Headers();
    let form = new FormData();
    form.append("pk", this.state.selected_meal.id);
    form.append("state", state);
    header.append("Authorization", "Token " + Context._currentValue.token);
    var requestOptions = {
      method: "POST",
      headers: header,
      body: form,
      redirect: "follow",
    };
    await fetch(
      Context._currentValue.ApiUrl + "/change_meal_status/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        this.dropDownAlertRef.alertWithType(
          state === "Approved" ? "success" : "fail",
          state === "Approved" ? "Approved" : "Rejected",
          state === "Approved"
            ? "This meal has been Approved, Thank You for being helpful"
            : "This meal has been Rejected, Thank You for being helpful"
        );
      });
    this.setState({ modal_visiblity: false });
    this._Onrefresh();
  }
  async _getInfo() {
    this.setState({ isLoading: true });
    var header = new Headers();
    header.append("Authorization", "Token " + Context._currentValue.token);
    var requestOptions = {
      method: "GET",
      headers: header,
      redirect: "follow",
    };
    await fetch(
      Context._currentValue.ApiUrl + "/pending_meals/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        if (response.pending_meals.length === 0)
          this.setState({ isEmpty: true });
        this.setState({ meals: response.pending_meals, isLoading: false });
      });
  }
  get_meal_by_pk(pk) {
    let meal = this.state.meals.filter((item) => item.id == pk);
    meal[0].recipe = meal[0].recipe.replace(/,/g, "\n");
    this.setState({ selected_meal: meal[0], modal_visiblity: true });
  }
  async _Onrefresh() {
    this.setState({ onRefresh: true, isLoading: true });
    await this._getInfo();
    this.setState({ onRefresh: false, isLoading: false });
  }
  render() {
    const button_width = this.state.animation_login;
    return (
      <SafeAreaView style={{ height: "102%", backgroundColor: "#FFF" }}>
        <StatusBar barStyle="light-content" />

        <View style={styles.top_notch}>
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
              color={"#FFF"}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Approve or Reject The Meals</Text>
          <Text style={styles.title}>Based On their Info</Text>
        </View>
        <AnimatedLoader
          visible={this.state.isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../components/animation/animation.json")}
          speed={1}
        ></AnimatedLoader>
        {!this.state.isEmpty ? (
          <FlatList
            data={this.state.meals}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.get_meal_by_pk(item.id)}>
                <MealtItem title={item.name} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            initialNumToRender={30}
            style={{
              alignSelf: "center",
              marginTop: width / 4,
              top: 0,
              maxHeight: height - width / 2 - 25,
              width: width / 1.15,
              backgroundColor: "rgba(101, 27, 98,0.2)",
              paddingTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => this._getInfo()}
              />
            }
          />
        ) : (
          <>
            <Text
              style={{
                alignSelf: "center",
                marginTop: width / 2,
                fontSize: 18,
                fontWeight: "bold",
                color: "#a8a8a8",
              }}
            >
              There is no meals requests 😕
            </Text>
            <Image
              source={require("../components/animation/empty.gif")}
              style={{
                width: 400,
                height: 350,
                alignSelf: "center",
                // marginTop: width / 2,
              }}
            />
          </>
        )}

        <View style={styles.bottom_notch}>
          <Text style={[styles.title, { fontSize: 14 }]}>
            Name : {Context._currentValue.user_info.first_name}{" "}
            {Context._currentValue.user_info.last_name}
          </Text>
          <Text style={[styles.title, { fontSize: 14 }]}>
            Role : {Context._currentValue.user_info.status}
          </Text>
          <Text style={[styles.title, { fontSize: 12, height: 25 }]}></Text>
        </View>

        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal_visiblity}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setState({ modal_visiblity: !modal_visiblity });
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTextTitle}>
                  {this.state.selected_meal.name}
                </Text>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "100%",
                  }}
                />
                <View style={{ alignSelf: "flex-start", width: "95%" }}>
                  <View style={styles.content_container}>
                    <Text style={[styles.textStyle, { color: "black" }]}>
                      Carbohydrate :
                    </Text>
                    <Text style={[styles.textStyle, { color: "#545454" }]}>
                      {this.state.selected_meal.carbohydrate}
                    </Text>
                  </View>
                  <View style={styles.content_container}>
                    <Text style={[styles.textStyle, { color: "black" }]}>
                      Calories :
                    </Text>
                    <Text style={[styles.textStyle, { color: "#545454" }]}>
                      {this.state.selected_meal.calories}
                    </Text>
                  </View>
                  <View style={styles.content_container}>
                    <Text style={[styles.textStyle, { color: "black" }]}>
                      Protien :
                    </Text>
                    <Text style={[styles.textStyle, { color: "#545454" }]}>
                      {this.state.selected_meal.protein}
                    </Text>
                  </View>
                  <View style={styles.content_container}>
                    <Text style={[styles.textStyle, { color: "black" }]}>
                      Fats :
                    </Text>
                    <Text style={[styles.textStyle, { color: "#545454" }]}>
                      {this.state.selected_meal.fats}
                    </Text>
                  </View>

                  <View style={[styles.content_container, { width: "60%" }]}>
                    <Text style={[styles.textStyle, { color: "black" }]}>
                      Recipe :
                    </Text>
                    <ScrollView style={{ maxHeight: 120 }}>
                      <Text style={[styles.textStyle, { color: "#545454" }]}>
                        {this.state.selected_meal.recipe}
                      </Text>
                    </ScrollView>
                  </View>
                </View>
                <View style={styles.botton_continer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>
                      this.setState({
                        modal_visiblity: !this.state.modal_visiblity,
                      })
                    }
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this._changeMealStatus("Approved")}
                  >
                    <Text style={styles.textStyle}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this._changeMealStatus("Rejected")}
                  >
                    <Text style={styles.textStyle}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  back_button: {
    zIndex: 9999,
    margin: 10,
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    position: "absolute",
    backgroundColor: "rgba(171, 0, 157,1)",
    borderRadius: 40,
    justifyContent: "center",
    color: "#FFF",
  },
  animation: {
    backgroundColor: "#93278f",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
    left: 15,
  },
  top_notch: {
    top: 0,
    position: "absolute",
    backgroundColor: "rgba(100, 0, 120,0.71)",
    height: width / 4,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bottom_notch: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    //backgroundColor: "rgba(101, 27, 98,0.6)",
    backgroundColor: "rgba(100, 0, 120,0.71)",

    height: width / 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: height / 6,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#B22AAE",
    width: 80,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 28,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  content_container: {
    width: "50%",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  botton_continer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    width: "95%",
  },
  title: {
    flex: 1,
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "sans-serif-medium",
    alignSelf: "center",
    textAlignVertical: "center",
  },
});
