import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { restaurantSelect as restaurantSelectAction } from "../actions/restaurant";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  totalFooter: {
    backgroundColor: "#d0d0d0",
    height: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
    elevation: 0
  },
  footerContainer: {
    paddingTop: 0,
    paddingBottom: 0
  },
  restaurantImage: {
    flex: 1,
    width: 100,
    height: 100
  },
  restaurantNameGroup: {
    flex: 1,
    padding: 24
  },
  restaurantNameTop: {
    flex: 1,
    fontSize: 20,
    textAlign: "center"
  },
  restaurantNameBottom: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

class MapScreen extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      error: null,
      markerLatitude: null,
      markerLongitude: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
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

  createFooter = () => {
    const { restaurant, navigation } = this.props;
    return (
      <View style={[styles.totalFooter, styles.footerContainer]}>
        <Image
          style={styles.restaurantImage}
          source={{ uri: restaurant.img }}
        />
        <View style={styles.restaurantNameGroup}>
          <Text style={styles.restaurantNameTop}>{restaurant.name}</Text>
          <View style={styles.restaurantNameBottom}>
            <Text>{restaurant.scoville}</Text>
            <Button
              title="OK"
              onPress={() =>
                navigation.navigate("DishList", { name: restaurant.name })
              }
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { restaurantSelect, restaurant } = this.props;
    const {
      latitude,
      longitude,
      markerLatitude,
      markerLongitude,
      error
    } = this.state;

    const footer =
      markerLatitude && restaurant.img ? this.createFooter() : null;
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
          onPress={async event => {
            this.setState({
              markerLatitude: event.nativeEvent.coordinate.latitude,
              markerLongitude: event.nativeEvent.coordinate.longitude
            });

            // TODO APIたたいてと店名もらう
            const data = (await axios.get(
              "https://us-central1-spajam2019-sendai.cloudfunctions.net/getRestaurant"
            )).data;
            console.log(data);

            // const response = {
            //   name: "一蘭",
            //   scoville: 3,
            //   img:
            //     "https://tblg.k-img.com/restaurant/images/Rvw/80296/640x640_rect_80296194.jpg"
            // };

            restaurantSelect({
              name: data.name,
              scoville: data.scoville || 0,
              img: data.picture
            });
          }}
        >
          <Marker
            coordinate={{
              latitude: markerLatitude || latitude,
              longitude: markerLongitude || longitude
            }}
          />
        </MapView>
        {error}
        {footer}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  restaurantSelect: values => {
    dispatch(restaurantSelectAction(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
