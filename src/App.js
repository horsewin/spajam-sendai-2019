import React from "react";
import {createAppContainer, createStackNavigator} from "react-navigation";
import {Provider} from "react-redux";
import configureStore from "./lib/store";
import HomeScreen from "./views/Home";
import DetailScreen from "./views/Detail";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Detail: {
        screen: DetailScreen
    }

});

export const store = configureStore();
const Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}
