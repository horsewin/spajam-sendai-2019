import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { sleep } from "../utils/sleep";
import { updateDishList as updateDishListAction } from "../actions/dishes";
import config from "../constants/config";

const styles = StyleSheet.create({
  container: {
    height: config.flatlistHeight,
    paddingBottom: 12,
    paddingRight: 12,
    paddingLeft: 12
  },
  itemList: {
    backgroundColor: "#d0d0d0",
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    padding: 24,
    alignItems: "center",
    elevation: 0
  },
  containerFlatListMarginBottom: {
    marginBottom: 48
  },
  restaurantImage: {
    flex: 1,
    width: 100,
    height: 100
  },
  restaurantNameGroup: {
    flex: 1,
    marginTop: 12,
    paddingRight: 12,
    paddingLeft: 1
  },
  restaurantNameTop: {
    fontSize: 16
  },
  restaurantNameBottom: {
    fontSize: 12,
    paddingTop: 12,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // Floating button
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: config.floatingButtonMargin,
    bottom: config.tabHeight - config.floatingButtonMargin
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 64,
    height: 64
  },
  //
  spinnerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

class DishListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { restaurant, updateDishList } = this.props;
    const url =
      "https://us-central1-spajam2019-sendai.cloudfunctions.net/getMenu?";
    const param = `key=${restaurant.key}`;
    const dishList = (await axios.get(url + param)).data;

    // ストアから料理一覧を取得
    updateDishList(dishList);
  }

  tokenListItem = ({ item }) => {
    return (
      <View style={[styles.itemList]}>
        <Image style={styles.restaurantImage} source={{ uri: item.picture }} />
        <View style={styles.restaurantNameGroup}>
          <Text style={styles.restaurantNameTop}>{item.name}</Text>
          <View style={styles.restaurantNameBottom}>
            <Text>辛さレベル {item.scoville}</Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   *
   * @return {*}
   */
  render() {
    const { dishes, navigation } = this.props;
    const keyExtractor = (item, id) => id.toString();

    const data = dishes ? (
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          style={styles.containerFlatListMarginBottom}
          data={dishes}
          renderItem={this.tokenListItem}
          // refreshControl={props.refreshControl}
          // onEndReached={props.onEndReachedAction}
        />
      </View>
    ) : (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );

    return (
      <View style={styles.container}>
        {data}
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Review");
            }}
            style={styles.TouchableOpacityStyle}
          >
            <Image
              source={{
                uri:
                  "https://aboutreact.com/wp-content/uploads/2018/08/bc72de57b000a7037294b53d34c2cbd1.png"
              }}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant,
  dishes: state.dishes
});

const mapDispatchToProps = dispatch => ({
  updateDishList: values => {
    dispatch(updateDishListAction(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishListScreen);
