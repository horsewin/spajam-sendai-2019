import { createStackNavigator } from "react-navigation";
import HomeScreen from "../views/Home";
import DetailScreen from "../views/Detail";
import ImageScreen from "../views/Image";
import MapScreen from "../views/Map";

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail: {
    screen: DetailScreen
  },
  Image: {
    screen: ImageScreen
  },
  Map: {
    screen: MapScreen
  }
});
