import React from "react";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import configureStore from "./lib/store";
import { AppNavigator } from "./navigators/app-navigator";

export const store = configureStore();
const Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
