import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "../views/Home";
import { MainNavigator } from "./main-navigator";

const AppNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainNavigator
    },
    User: {
      screen: HomeScreen,
      navigationOptions: {}
    }
  },
  {
    tabBarPosition: "bottom",
    lazy: false
  }
);
export default AppNavigator;
