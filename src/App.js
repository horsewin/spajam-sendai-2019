import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import S from "./views/Splash";
import configureStore from "./lib/store";
import AppNavigator from "./navigators/app-navigator";

export const store = configureStore();

const switchNavigation = createSwitchNavigator(
  {
    Splash: {
      screen: S
    },
    App: {
      screen: AppNavigator
    }
  },
  {
    initialRouteName: "Splash"
  }
);
const Navigation = createAppContainer(switchNavigation);

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
