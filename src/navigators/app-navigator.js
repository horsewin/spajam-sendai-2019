import { createBottomTabNavigator } from "react-navigation";
// import React from "react";
// import { StyleSheet } from "react-native";
import { MainNavigator } from "./main-navigator";
import { UserNavigator } from "./user-navigator";
import config from "../constants/config";
//
// const styles = StyleSheet.create({
//   navButton: {
//     backgroundColor: "transparent",
//     flexDirection: "column",
//     justifyContent: "center",
//     flex: 1,
//     height: 50,
//     marginTop: 0,
//     marginBottom: 0,
//     marginRight: 0,
//     marginLeft: 0,
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingRight: 0,
//     paddingLeft: 0,
//     elevation: 0
//   },
//   navImage: {
//     backgroundColor: "transparent"
//   },
//   navText: {
//     color: "#fff",
//     fontSize: 8,
//     marginTop: 2
//   }
// });

const AppNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainNavigator,
      navigationOptions: {
        title: `メイン`
      }
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        title: `マイページ`
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: config.color.primaryColor,
      tabStyle: {
        backgroundColor: config.color.blackColor
      }
    },
    tabBarPosition: "bottom",
    lazy: false
  }
);
export default AppNavigator;
