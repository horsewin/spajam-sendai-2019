import React from "react";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import configureStore from "./lib/store";
import AppNavigator from "./navigators/app-navigator";

export const store = configureStore();
const Navigation = createAppContainer(AppNavigator);

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
