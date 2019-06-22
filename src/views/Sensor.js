import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType
} from "react-native-sensors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontFamily: "NotoSansCJKjp-Regular"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontFamily: "NotoSansCJKjp-Thin"
  }
});

export default class SensorScreen extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      speed: null,
      error: null,
      subscription: null
    };
  }

  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.accelerometer, 3000); // defaults to 100ms
    const subscription = accelerometer.subscribe(
      speed => {
        this.setState({
          speed: `${speed.x}\n${speed.y}\n${speed.z}\n`
        });
      },
      error => {
        this.setState({
          error
        });
      }
    );
    this.setState({
      subscription
    });
  }

  componentWillUnmount() {
    const { subscription } = this.state;
    subscription.unsubscribe();
    this.setState({ subscription: null });
  }

  render() {
    const { error, speed } = this.state;
    const component = error || `加速度センサ\n${speed}`;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hey, PUA sensor!</Text>
        <Text style={styles.instructions}>{component}</Text>
      </View>
    );
  }
}
