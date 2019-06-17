import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default class MapScreen extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      error: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    const { latitude, longitude, error } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
        {error}
      </View>
    );
  }
}
