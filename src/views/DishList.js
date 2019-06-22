import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import React from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { sleep } from "../utils/sleep";

const styles = StyleSheet.create({
  container: {
    height: 620,
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 12,
    paddingLeft: 12
  },
  itemList: {
    backgroundColor: "#d0d0d0",
    height: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    padding: 24,
    alignItems: "center",
    elevation: 0
  },
  restaurantImage: {
    flex: 1,
    width: 100,
    height: 100
  },
  restaurantNameGroup: {
    flex: 1,
    marginTop: 24,
    paddingRight: 12,
    paddingLeft: 12
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
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 64,
    height: 64
  }
});

class DishListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dishList: null
    };
  }

  async componentDidMount() {
    // TODO 料理一覧を取得するAPI
    // const res = await axios.post(
    //   "https://us-central1-spajam2019-sendai.cloudfunctions.net/sampleApi",
    //   {
    //     name: "Arumon"
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }
    // );
    // TODO APIにしたら下の行は消す
    await sleep(3000);

    const dishList = [
      {
        name: "料理名1",
        img:
          "https://tblg.k-img.com/restaurant/images/Rvw/80296/640x640_rect_80296194.jpg",
        scoville: 8
      }
    ];
    const tmpDish = {
      name: "料理名",
      img:
        "https://tblg.k-img.com/restaurant/images/Rvw/80296/640x640_rect_80296194.jpg",
      scoville: 5
    };

    dishList.push(tmpDish);
    this.setState({
      dishList
    });
  }

  tokenListItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <View style={[styles.itemList]}>
        <Image style={styles.restaurantImage} source={{ uri: item.img }} />
        <View style={styles.restaurantNameGroup}>
          <Text style={styles.restaurantNameTop}>{item.name}</Text>
          <View style={styles.restaurantNameBottom}>
            <Text>辛さレベル {item.scoville}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { dishList } = this.state;
    const keyExtractor = (item, id) => id.toString();

    const data = (
      <FlatList
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.container}
        data={dishList}
        renderItem={this.tokenListItem}
        // refreshControl={props.refreshControl}
        // onEndReached={props.onEndReachedAction}
      />
    );

    return (
      <View style={styles.container}>
        {data}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={null}
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
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishListScreen);
