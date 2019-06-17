import {Platform, StyleSheet, Text, View, Button} from "react-native";
import React from "react";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontFamily: "NotoSansCJKjp-Regular"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontFamily: "NotoSansCJKjp-Thin"
    },
});

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hey, PUA!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate("Detail")}
                />
                <Button
                    title="Go to Image"
                    onPress={() => this.props.navigation.navigate("Image")}
                />
            </View>
        );
    }
}
