import { createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AsyncStorage } from "react-native";
import Login from "../pages/login";
import MainPage from "../pages/profile";
import AddMeal from "../pages/Add_meal";
import CreateMeal from "../pages/create_meal";
import Home from "../pages/home";
import Approv from "../pages/approval";
import Suggestions from "../pages/suggeestions";
let screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  },
  Profile: {
    screen: MainPage,
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  },
  AddMeal: {
    screen: AddMeal,
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  },
  CreateMeal: {
    screen: CreateMeal,
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  },
  Approv: {
    screen: Approv,
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  },
  Suggestions: {
    screen: Suggestions,
    navigationOptions: {
      drawerLockMode: "locked-closed",
    },
  },
};
const MainNavigator = createDrawerNavigator(screens);

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
