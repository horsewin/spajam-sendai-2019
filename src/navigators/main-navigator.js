import { createStackNavigator } from "react-navigation";
import HomeScreen from "../views/Home";
import DetailScreen from "../views/Detail";
import ImageScreen from "../views/Image";
import MapScreen from "../views/Map";
import SensorScreen from "../views/Sensor";

export const MainNavigator = createStackNavigator(
  {
    Image: {
      screen: ImageScreen
    },
    Map: {
      screen: MapScreen
    }
  },
  {
    initialRouteName: "Map",
    headerMode: "none"
  }
);
