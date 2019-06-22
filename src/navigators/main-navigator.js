import { createStackNavigator } from "react-navigation";
import MapScreen from "../views/Map";
import DishListScreen from "../views/DishList";
import { defaultHeader } from "../components/header";
import ReviewScreen from "../views/Review";

export const MainNavigator = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        headerMode: "none"
      }
    },
    DishList: {
      screen: DishListScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`
      })
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: {
        title: `スコヴィル値登録`
      }
    }
  },
  {
    initialRouteName: "Map",
    defaultNavigationOptions: defaultHeader
  }
);
