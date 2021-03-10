import { createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import Login from "../pages/login";
import MainPage from "../pages/profile";
import AddMeal from "../pages/Add_meal";
import CreateMeal from "../pages/create_meal";
import Home from "../pages/home";

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Profile: {
    screen: MainPage,
  },
  AddMeal: {
    screen: AddMeal,
  },
  CreateMeal: {
    screen: CreateMeal,
  },
});
const Navigator = (signedin = false) => {
  var init;
  if (signedin == "true") init = "MainNavigator";
  else init = "Login";
  return createSwitchNavigator(
    {
      Login: { screen: Login },
      MainNavigator: { screen: MainNavigator }, // change this to DrawerNavigator
    },
    {
      initialRouteName: init,
    }
  );
};

export default Navigator;
