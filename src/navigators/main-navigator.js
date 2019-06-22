import { createStackNavigator } from "react-navigation";
import ImageScreen from "../views/Image";
import MapScreen from "../views/Map";
import DishListScreen from "../views/DishList";
import { defaultHeader } from "../components/header";

export const MainNavigator = createStackNavigator(
  {
    Image: {
      screen: ImageScreen
    },
    Map: {
      screen: MapScreen
    },
    DishList: {
      screen: DishListScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`
      })
    }
  },
  {
    initialRouteName: "Map",
    headerMode: "none",
    defaultNavigationOptions: defaultHeader
  }
);
