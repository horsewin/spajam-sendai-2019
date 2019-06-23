import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateDishList as updateDishListAction } from "../actions/dishes";
import config from "../constants/config";
import { setGetUrl } from "../utils/api";

console.log('hello');
console.log(config);

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.whiteColor,
    height: config.flatlistHeight,
    paddingBottom: 12,
    paddingRight: 12,
    paddingLeft: 12
  },
  itemList: {
    backgroundColor: config.color.blackColor,
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
    paddingLeft: 12
  },
  restaurantNameTop: {
    fontSize: 14
  },
  restaurantNameBottom: {
    fontSize: 20,
    paddingTop: 12,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  restaurantTextColor: {
    color: config.color.fontColor
  },
  // Floating button
  TouchableOpacityViewStyle: {
    position: "absolute",
    right: config.floatingButtonMargin + 12,
    bottom: config.floatingButtonMargin + 56
  },
  TouchableOpacityStyle: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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
  },
  restaurantPrimaryColor: {
    color: config.color.primaryColor
  }
});

class DishListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { restaurant, updateDishList } = this.props;
    const param = `key=${restaurant.key}`;
    const url = setGetUrl("/getMenu", param);
    const dishList = (await axios.get(url)).data;

    // ストアから料理一覧を取得
    updateDishList(dishList);
  }

  tokenListItem = ({ item }) => {
    return (
      <View style={[styles.itemList]}>
        <Image style={styles.restaurantImage} source={{ uri: item.picture }} />
        <View style={styles.restaurantNameGroup}>
          <Text style={[styles.restaurantNameTop, styles.restaurantTextColor]}>
            {item.name}
          </Text>
          <View style={styles.restaurantNameBottom}>
            <Text style={[styles.restaurantPrimaryColor]}>
              {`${item.scoville.toLocaleString()} `}
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
        <View style={styles.TouchableOpacityViewStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Review");
            }}
            style={styles.TouchableOpacityStyle}
          >
            <Image
              source={require("../../assets/images/floating.png")}
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
