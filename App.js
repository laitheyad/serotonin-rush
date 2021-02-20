import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import Login from "./src/pages/login";
import MainPage from "./src/pages/profile";
import AddMeal from "./src/pages/Add_meal";
import CreateMeal from "./src/pages/create_meal";
const MainNavigator = createDrawerNavigator({
  Login: {
    screen: Login,
  },
  profile: {
    screen: MainPage,
  },
  AddMeal: {
    screen: AddMeal,
  },
  CreateMeal: {
    screen: CreateMeal,
  },
});
const App = createAppContainer(MainNavigator);

export default App;
