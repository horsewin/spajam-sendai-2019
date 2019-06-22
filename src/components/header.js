import config from "../constants/config";

export const defaultHeader = {
  headerStyle: {
    width: "100%",
    height: 72,
    borderBottomWidth: 0,
    backgroundColor: config.color.blackColor
  },
  headerTitleStyle: {
    width: "150%",
    fontFamily: "NotoSansCJKjp-Regular",
    fontSize: 16,
    color: config.color.fontColor
  },
  headerBackTitle: null
  // headerBackImage: backImage
};
