import * as React from "react";
import { Dropdown } from "react-native-material-dropdown";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
import { sleep } from "../utils/sleep";
import config from "../constants/config";
import { updateMyDishList as updateMyDishListAction } from "../actions/myDishes";
import { setGetUrl, setPostUrl } from "../utils/api";
import { ScovilleButton } from "../components/scovilleButton";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.color.greyColor
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  errorMessage: {
    fontSize: 12,
    color: "#FF0303",
    fontFamily: "NotoSansCJKjp-Regular",
    marginTop: 6
  },
  flexText: {
    flexDirection: "row",
    justifyContent: "center"
  },
  h2: {
    color: config.color.fontColor,
    fontSize: 20,
    fontFamily: "NotoSansCJKjp-Regular"
  },
  marginBottom: {
    marginBottom: 36
  },
  textFont: {
    fontSize: 30,
    fontFamily: "NotoSansCJKjp-Regular",
    justifyContent: "center",
    color: config.color.primaryColor
  }
});

/**
 *
 */
class ReviewScreen extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      source: null,
      dish: null,
      udid: null,
      scoville: 0,
      modalVisible: false,
      error: false
    };
  }

  async componentDidMount() {
    const udid = DeviceInfo.getUniqueID();
    this.setState({
      udid
    });
  }

  uploadImage = async () => {
    const options = {
      title: "",
      takePhotoButtonTitle: "写真をとる",
      chooseFromLibraryButtonTitle: "フォトライブラリ",
      cancelButtonTitle: "キャンセル"
    };
    ImagePicker.showImagePicker(options, async response => {
      console.log("image ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          source
        });
      }
    });
  };

  postReviewData = async () => {
    const { navigation, restaurant, updateMyDishList } = this.props;
    const { dish, udid, scoville } = this.state;

    if (!dish) {
      this.setState({
        error: true
      });
      return;
    }

    await this.setState({
      modalVisible: true
    });

    const url = setPostUrl("/updateHistory");
    const body = {
      udid,
      dish,
      restaurantName: restaurant.name,
      scoville
    };

    // レビュー情報の登録
    // await axios.post(url, body);
    await sleep(1500);

    const param = `udid=${udid}`;
    const getHistoryUrl = setGetUrl("/getHistory", param);
    const myDishList = (await axios.get(getHistoryUrl)).data;
    updateMyDishList(myDishList.dishes);

    await this.setState({
      modalVisible: false
    });

    // ユーザ画面へ飛ばす
    navigation.dispatch(
      StackActions.reset({
        actions: [NavigationActions.navigate({ routeName: "Map" })],
        index: 0
      })
    );
    navigation.navigate("User");
  };

  render() {
    const { dishes } = this.props;
    const { dish, scoville, modalVisible, error } = this.state;
    let data = [];
    for (const dish of dishes) {
      data.push({ value: dish.name });
    }

    const imageComponent = this.state.source ? (
      <Image style={styles.image} source={this.state.source} />
    ) : (
      <Image
        style={styles.image}
        source={require("../../assets/images/upload.png")}
      />
    );
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={this.uploadImage}>
            {imageComponent}
          </TouchableOpacity>
          <View style={{ width: 200 }}>
            <Dropdown
              value={dish || "選択してください"}
              onChangeText={dish => {
                this.setState({
                  error: false,
                  dish
                });
              }}
              label="食事名"
              data={data}
            />
            {error ? (
              <Text style={styles.errorMessage}>
                商品を選択するか写真を撮影してください。
              </Text>
            ) : null}
            <Slider
              style={{ width: 200, height: 80, marginVertical: 10 }}
              value={scoville}
              onValueChange={scoville =>
                this.setState({
                  scoville
                })
              }
              minimumValue={0}
              maximumValue={30000}
              step={1}
              thumbImage={require("../../assets/images/chili-pepper.png")}
              // minimumTrackImage={require("../../assets/images/green-pepper.png")}
              // maximumTrackImage={require("../../assets/images/green-pepper.png")}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.textFont}>{scoville}</Text>
          </View>
          <ScovilleButton text={"OK"} onPress={this.postReviewData} />
        </View>
        <Modal isVisible={modalVisible}>
          <View style={{ marginTop: 300, flex: 1 }}>
            <View style={styles.flexText}>
              <Text style={[styles.h2, styles.marginBottom]}>送信中です</Text>
            </View>
            <ActivityIndicator size="large" color="#F4A626" />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant,
  dishes: state.dishes
});

const mapDispatchToProps = dispatch => ({
  updateMyDishList: values => {
    dispatch(updateMyDishListAction(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewScreen);
