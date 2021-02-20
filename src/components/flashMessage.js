import React from "react";
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";

export default class FlashMessageAlert extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View ref={"myLocalFlashMessage"} />
        <View ref={"otherView2"} />
        <View ref={"otherView3"} />
        {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
        <FlashMessage position="top" /> {/* <--- here as last component */}
      </View>
    );
  }
}
