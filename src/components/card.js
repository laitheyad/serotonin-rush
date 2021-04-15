import React, { Component, Fragment } from "react";
import { View, StyleSheet, Animated, Text, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const defaultState = {
  height: 90,
  width: 90,
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        style={{ margin: 10 }}
        onLongPress={() =>
          Animated.timing(this.state.width, {
            toValue: 250,
            duration: 250,
            useNativeDriver: false,
          })
        }
      >
        <LinearGradient
          style={[
            styles.card,
            { height: this.state.height, width: this.state.width },
          ]}
          colors={["#D481D2", "#B22AAE"]}
        >
          <View style={{ flexDirection: "column" }}>
            <Icon
              name={this.props.icon}
              size={34}
              type="Materialicons"
              container
              color={"#ffffff"}
              style={styles.icon}
            />
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}
var styles = StyleSheet.create({
  card: {
    // width: 110,
    // height: 110,
    backgroundColor: "rgba(161, 50, 157,0.8)",
    borderRadius: 100,
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: -2,
    fontSize: 14,
    color: "#FFFF",
    // fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
    marginTop: 15,
  },
});
