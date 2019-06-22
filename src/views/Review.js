import * as React from "react";
import { Dropdown } from "react-native-material-dropdown";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";

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
    margin: 10
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain"
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
      udid: null
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

  render() {
    const { dishes } = this.props;
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
        <TouchableOpacity onPress={this.uploadImage}>
          {imageComponent}
        </TouchableOpacity>
        <View style={{ width: 200 }}>
          <Dropdown label="食事名" data={data} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant,
  dishes: state.dishes
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewScreen);
