import React from "react";
import { default as Alert, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { restaurantSelect as restaurantSelectAction } from "../actions/restaurant";
import axios from "axios";
import { setPostUrl } from "../utils/api";
import { ScovilleButton } from "../components/scovilleButton";
import DeviceInfo from "react-native-device-info";
import config from "../constants/config";

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
    backgroundColor: config.color.greyColor,
    height: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
    paddingBottom: 10,
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
    fontSize: 18
  },
  marginLeft: {
    marginLeft: 12
  },
  scovilleValueBottom: {
    fontSize: 26,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  restaurantNameBottom: {
    fontSize: 16,
    marginBottom: 2,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  restaurantTextColor: {
    color: config.color.fontColor
  },
  restaurantPrimaryColor: {
    color: config.color.primaryColor
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
          source={{ uri: restaurant.picture }}
        />
        <View style={styles.restaurantNameGroup}>
          <Text style={[styles.restaurantNameTop, styles.restaurantTextColor]}>
            {restaurant.name}
          </Text>
          <View style={styles.restaurantNameBottom}>
            <Image source={require("../../assets/images/chili-pepper2.png")} />
            <Text
              style={[
                styles.marginLeft,
                styles.scovilleValueBottom,
                styles.restaurantPrimaryColor
              ]}
            >
              {`${restaurant.averageScoville.toLocaleString()} `}
              <Text
                style={[
                  styles.restaurantPrimaryColor,
                  {
                    fontSize: 14
                  }
                ]}
              >{`[SHU]`}</Text>
            </Text>
          </View>
          <ScovilleButton
            text="GO"
            onPress={() =>
              navigation.navigate("DishList", { name: restaurant.name })
            }
          />
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
      markerLatitude && restaurant.picture ? this.createFooter() : null;
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
            const isSimulator = DeviceInfo.isEmulator();
            const latitude = isSimulator
              ? 38.27196533
              : event.nativeEvent.coordinate.latitude;
            const longitude = isSimulator
              ? 140.871116
              : event.nativeEvent.coordinate.longitude;
            this.setState({
              markerLatitude: latitude,
              markerLongitude: longitude,
              latitude,
              longitude
            });

            // const url = setGetUrl("/getRestaurant");
            const url = setPostUrl("/getNearestRestaurant");
            const param = {
              latitude,
              longitude
            };
            try {
              const data = (await axios.post(url, param)).data;
              if (data) {
                restaurantSelect({
                  key: data.key,
                  name: data.name,
                  picture: data.picture,
                  averageScoville: data.averageScoville || 0
                });
              } else {
                Alert.alert(
                  "検索結果",
                  "近くに登録されているお店がありません。",
                  [{ text: "OK", onPress: () => console.log("") }],
                  { cancelable: false }
                );
              }
            } catch (error) {
              Alert.alert(
                "検索結果",
                "近くに登録されているお店がありません。",
                [{ text: "OK", onPress: () => console.log("") }],
                { cancelable: false }
              );
            }
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
