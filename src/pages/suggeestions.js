import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Context from "../context/globalSettings";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { Card, ListItem, Button, Icon } from "react-native-elements";
import AnimatedLoader from "react-native-animated-loader";
import DropdownAlert from "react-native-dropdownalert";

const pages = [
  // { title: "Home", icon: "home", page: "Home" },
  { title: "Profile", icon: "fingerprint", page: "Profile" },
  { title: "Add Meal", icon: "library-add", page: "AddMeal" },
  { title: "create Meal", icon: "set-meal", page: "CreateMeal" },
];

const defaultState = {
  token: "",
  news: [],
  isFetching: false,
  selected_meal: {},
  modal_visiblity: false,
  best: "",
  error: false,
  error_message: "",
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }
  async _getSuggestions() {
    this.setState({ isFetching: true });
    let form = new FormData();
    form.append("token", Context._currentValue.token);
    let header = new Headers();
    header.append("Authorization", "Token " + Context._currentValue.token);
    var requestOptions = {
      method: "POST",
      headers: header,
      body: form,
      redirect: "follow",
    };
    await fetch(Context._currentValue.ApiUrl + "/correlation/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        if (response.message === "error") {
          this.dropDownAlertRef.alertWithType("fail", response.value);
          return this.setState({
            error: true,
            error_message: response.value,
          });
        }
        this.setState({ news: response.meals, best: response.best_for_you });
      });
    this.setState({ isFetching: false });
  }

  async componentDidMount() {
    this.setState({ token: Context._currentValue.token });
    this._getSuggestions();
  }

  render() {
    return (
      <SafeAreaView style={styles.page}>
        <DropdownAlert
          ref={(ref) => (this.dropDownAlertRef = ref)}
          successColor={"#b038ac"}
          successImageSrc={require("../img/check.png")}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: 60,
            backgroundColor: "rgb(161, 50, 157)",
          }}
        >
          <Text style={styles.title}>Best Suggestions !</Text>
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
            color={"#FFF"}
          />
        </TouchableOpacity>
        <ScrollView style={{ marginTop: 70 }}>
          {this.state.error && (
            <View
              style={{
                height: 70,
                paddingLeft: 10,
                paddingRight: 10,
                margin: 10,
                backgroundColor: "rgb(161, 50, 157)",
                borderRadius: 10,
              }}
            >
              <Text style={[styles.title, { fontSize: 16 }]}>
                {this.state.error_message}
              </Text>
            </View>
          )}
          {!this.state.error && (
            <View
              style={{
                height: 80,
                paddingLeft: 10,
                paddingRight: 10,
                margin: 10,
                backgroundColor: "rgb(161, 50, 157)",
                borderRadius: 10,
              }}
            >
              <Text style={[styles.title, { fontSize: 16 }]}>
                Based on your records, the Best Component that helps you to be
                happy is :{" "}
                <Text
                  style={{
                    fontSize: 18,
                    backgroundColor: "rgb(161, 100, 157)",
                  }}
                >
                  {this.state.best}
                </Text>
                , Here is {this.state.news.length} meals that contains a high
                percentage of {this.state.best}
              </Text>
            </View>
          )}
          {!this.state.error &&
            this.state.news.map((meal, i) => {
              return (
                <Card
                  key={i}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 15,
                  }}
                >
                  <Card.Title>{meal.name}</Card.Title>
                  <Card.Divider />
                  <Card.Image
                    style={{ borderRadius: 15 }}
                    source={require("../img/mael.jpeg")}
                  ></Card.Image>
                  <Text style={{ margin: 10 }}>{meal.recipe}</Text>
                  <Button
                    icon={<Icon name="preview" color="#ffffff" />}
                    buttonStyle={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 0,
                      backgroundColor: "rgba(161, 50, 157,0.6)",
                    }}
                    title="VIEW NOW"
                    onPress={() =>
                      this.setState({
                        modal_visiblity: true,
                        selected_meal: meal,
                      })
                    }
                  />
                </Card>
              );
            })}
        </ScrollView>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal_visiblity}
            onRequestClose={() => {
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
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <AnimatedLoader
          visible={this.state.isFetching}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../components/animation/animation.json")}
          speed={1}
        ></AnimatedLoader>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  page: { backgroundColor: "#FCD6FB", height: "100%" },
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
  back_button: {
    zIndex: 9999,
    margin: 10,
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    position: "absolute",
    backgroundColor: "rgba(180, 50, 157,1)",
    borderRadius: 40,
    justifyContent: "center",
    color: "#FFF",
  },
});
