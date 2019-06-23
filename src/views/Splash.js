import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import React from "react";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { connect } from "react-redux";
import { updateMyDishList as updateMyDishListAction } from "../actions/myDishes";
import { setGetUrl } from "../utils/api";
import config from "../constants/config";
import { sleep } from "../utils/sleep";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.color.greyColor,
    paddingRight: 12,
    paddingLeft: 12
  },
  historyInformationArea: {
    padding: 0
  },
  historyTitleLabel: {
    fontFamily: "NotoSansCJKjp-Regular",
    fontSize: 16,
    color: "#3C3C3C"
  },
  userInformationArea: {
    backgroundColor: config.color.greyColor,
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
    paddingBottom: 0,
    elevation: 0
  },
  containerFlatListMarginBottom: {
    flex: 1,
    marginBottom: 48
  },
  restaurantImage: {
    flex: 1,
    resizeMode: "contain",
    width: 756,
    height: 1334
  },
  restaurantNameGroup: {
    flex: 1,
    padding: 24
  },
  restaurantNameTop: {
    flex: 1,
    fontSize: 20
  },
  restaurantTextColor: {
    color: config.color.fontColor
  },
  restaurantPrimaryColor: {
    color: config.color.primaryColor
  },
  restaurantNameBottom: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  marginTop: {
    marginTop: 12
  },
  scovilleValueBottom: {
    fontSize: 26,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

class MyPageScreen extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      myScoville: 0
    };
  }

  async componentDidMount() {
    await sleep(3000);
    this.props.navigation.navigate("App");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.restaurantImage}
          source={require("../../assets/images/splash/splash-750x1334.png")}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  myDishes: state.myDishes
});

const mapDispatchToProps = dispatch => ({
  updateMyDishList: values => {
    dispatch(updateMyDishListAction(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageScreen);
