import React, { Component, Fragment } from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

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
      <Card style={{ margin: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Card.Title
            title={
              this.props.title.length > 28
                ? this.props.title.substring(0, 28 - 3) + "..."
                : this.props.title
            }
            style={{ alignSelf: "center", maxWidth: "85%" }}
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
        <Card.Content>
          <Paragraph>
            {this.props.body.length > 115
              ? this.props.body.substring(0, 115 - 3) + "..."
              : this.props.body}
          </Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: this.props.image,
          }}
          style={{ margin: 5, borderRadius: 10, borderBottomLeftRadius: 10 }}
        />
      </Card>
      // <View style={styles.card}>
      //   <View
      //     style={{
      //       flexDirection: "row-reverse",
      //       justifyContent: "space-between",
      //       alignItems: "flex-start",
      //     }}
      //   >
      //     <View style={{ alignItems: "center" }}>
      //       <Image
      //         style={styles.image}
      //         source={{
      //           uri:
      //             "https://cdn.pixabay.com/photo/2020/05/15/18/46/corona-5174671_960_720.jpg",
      //         }}
      //       />
      //       <TouchableOpacity
      //         onPress={() => Linking.openURL(this.props.url)}
      //         style={{
      //           height: 35,
      //           width: 35,
      //           backgroundColor: "rgba(161, 50, 157,0.7)",
      //           borderRadius: 50,
      //           justifyContent: "center",
      //           marginTop: 10,
      //         }}
      //       >
      //         <Icon name="link" size={26} type="entypo" color={"#ffffff"} />
      //       </TouchableOpacity>
      //     </View>
      //     <View
      //       style={{ flexDirection: "column", justifyContent: "space-between" }}
      //     >
      //       <View style={styles.title}>
      //         <Text
      //           style={[
      //             styles.text,
      //             { fontWeight: "bold", textAlign: "center", fontSize: 17 },
      //           ]}
      //         >
      //           {this.props.title.length > 32
      //             ? this.props.title.substring(0, 32 - 3) + "..."
      //             : this.props.title}
      //           {/* {this.props.title} */}
      //         </Text>
      //       </View>
      //       <View style={styles.title}>
      //         <Text
      //           style={[
      //             styles.text,
      //             {
      //               fontSize: 15,
      //               textAlign: "center",
      //               height: 61,
      //               justifyContent: "flex-start",
      //             },
      //           ]}
      //         >
      //           {this.props.body.length > 50
      //             ? this.props.body.substring(0, 50 - 3) + "..."
      //             : this.props.body}
      //           {/* {this.props.body} */}
      //         </Text>
      //       </View>

      //       <View style={styles.url}>
      //         <Text
      //           style={{
      //             textAlign: "left",
      //             marginLeft: 10,
      //             color: "white",
      //             fontSize: 15,
      //           }}
      //         >
      //           {this.props.url.length > 50
      //             ? this.props.url.substring(0, 40 - 3) + "..."
      //             : this.props.url}
      //         </Text>
      //       </View>
      //     </View>
      //   </View>
      // </View>
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
    marginLeft: 80,
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
    left: 52,
    width: "112%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "rgba(161, 50, 157,0.7)",
  },
});
