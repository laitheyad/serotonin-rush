import React, { Component, Fragment } from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

const defaultState = {
  height: 110,
  width: 110,
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }
  render() {
    return (
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2020/05/15/18/46/corona-5174671_960_720.jpg",
              }}
            />
            <TouchableOpacity
              onPress={() => Linking.openURL(this.props.url)}
              style={{
                height: 35,
                width: 35,
                backgroundColor: "rgba(161, 50, 157,0.7)",
                borderRadius: 50,
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Icon name="link" size={26} type="entypo" color={"#ffffff"} />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <View style={styles.title}>
              <Text
                style={[
                  styles.text,
                  { fontWeight: "bold", textAlign: "center", fontSize: 17 },
                ]}
              >
                {this.props.title.length > 32
                  ? this.props.title.substring(0, 32 - 3) + "..."
                  : this.props.title}
                {/* {this.props.title} */}
              </Text>
            </View>
            <View style={styles.title}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 15,
                    textAlign: "center",
                    height: 80,
                    justifyContent: "flex-start",
                  },
                ]}
              >
                {this.props.body.length > 400
                  ? this.props.body.substring(0, 400 - 3) + "..."
                  : this.props.body}
                {/* {this.props.body} */}
              </Text>
            </View>

            <View style={[styles.url, { width: "130%" }]}>
              <Text
                style={[styles.text, { textAlign: "left", marginLeft: 10 }]}
              >
                {this.props.url.length > 50
                  ? this.props.url.substring(0, 40 - 3) + "..."
                  : this.props.url}
                {/* {this.props.url} */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  card: {
    height: 150,
    backgroundColor: "rgba(161, 50, 157,0.4)",
    borderRadius: 15,
    margin: 7,
    padding: 5,
  },
  image: {
    borderRadius: 10,
    height: 70,
    width: 90,
    zIndex: 10,
  },
  title: {
    justifyContent: "flex-end",
    margin: 5,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontFamily: "sans-serif-thin",
    fontWeight: "normal",
    maxWidth: 280,
    marginLeft: 0,
  },
  url: {
    marginTop: 4,
    marginLeft: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "rgba(161, 50, 157,0.7)",
  },
});
