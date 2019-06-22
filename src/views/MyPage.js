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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
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
    backgroundColor: "#F5FCFF",
    height: 300,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
    elevation: 0
  },
  containerFlatListMarginBottom: {
    marginBottom: 48
  },
  restaurantImage: {
    flex: 1,
    width: 200,
    height: 200
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

class MyPageScreen extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      myScoville: 0
    };
  }

  async componentDidMount() {
    const { updateMyDishList } = this.props;
    const udid = DeviceInfo.getUniqueID();
    const param = `udid=${udid}`;
    const getHistoryUrl = setGetUrl("/getHistory", param);
    const myDishList = (await axios.get(getHistoryUrl)).data;
    updateMyDishList(myDishList.dishes);

    const myScovilleUrl = setGetUrl("/getPersonalScoville", param);
    const myScoville = (await axios.get(myScovilleUrl)).data.scoville;
    console.log(myScoville);
    this.setState({
      myScoville
    });
  }

  tokenListItem = ({ item }) => {
    return (
      <View style={styles.historyInformationArea}>
        <View style={styles.restaurantNameGroup}>
          <Text style={styles.restaurantNameTop}>{item.restaurantName}</Text>
          <Text style={styles.restaurantNameTop}>{item.dish}</Text>
          <View style={styles.restaurantNameBottom}>
            <Text>辛さレベル {item.scoville}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { myDishes } = this.props;
    const { myScoville } = this.state;
    const keyExtractor = (item, id) => id.toString();

    const data = myDishes ? (
      <View>
        <Text style={styles.historyTitleLabel}>・辛さ履歴</Text>
        <FlatList
          keyExtractor={keyExtractor}
          style={styles.containerFlatListMarginBottom}
          data={myDishes}
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
        <View style={[styles.userInformationArea, { flex: 2 }]}>
          <Image
            style={styles.restaurantImage}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZX90fH9ql-PY-S6ogOJuLGTOshZfghWv24qwAlC6IN-e4sqy6"
            }}
          />
          <View style={styles.restaurantNameGroup}>
            <Text style={styles.restaurantNameTop}>PUAさん</Text>
            <View style={styles.restaurantNameBottom}>
              <Text>Scovilleレベル</Text>
              <Text>{myScoville}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.userInformationArea, { flex: 3 }]}>{data}</View>
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
