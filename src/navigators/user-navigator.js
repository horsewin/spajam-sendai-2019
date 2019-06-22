import { createStackNavigator } from "react-navigation";
import { defaultHeader } from "../components/header";
import MyPageScreen from "../views/MyPage";

export const UserNavigator = createStackNavigator(
  {
    User: {
      screen: MyPageScreen,
      navigationOptions: {
        title: `マイページ`
      }
    }
  },
  {
    initialRouteName: "User",
    defaultNavigationOptions: defaultHeader
  }
);
