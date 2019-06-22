import { Button } from "native-base";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

// interface props {
//   disabled?: boolean;
//   text: string;
//   onPress?: () => any;
//   viewStyle?: ViewStyle;
//   fontStyle?: TextStyle;
//   containerStyle?: ViewStyle;
//   secondary?: boolean;
// }
//
const styles = StyleSheet.create({
  buttonStretch: {
    alignSelf: "stretch",
    justifyContent: "center",
    borderWidth: 0,
    height: 44
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansCJKjp-Medium",
    textAlign: "center"
  },
  buttonPrimaryText: {
    color: "#FFF"
  },
  buttonPrimaryDisabled: {
    backgroundColor: "rgba(58, 135, 96, 0.3)",
    borderColor: "rgba(58, 135, 96, 0.3)",
    elevation: 0
  },
  buttonPrimaryIdle: {
    backgroundColor: "#3A8760",
    elevation: 0
  }
});

export const ScovilleButton = props => {
  const { text, viewStyle, fontStyle, containerStyle } = props;
  let { disabled, onPress } = props;
  disabled = disabled || false;

  const buttonStyle = [
    styles.buttonStretch,
    disabled ? styles.buttonPrimaryDisabled : styles.buttonPrimaryIdle,
    viewStyle
  ];

  const textStyle = [styles.buttonText, styles.buttonPrimaryText, fontStyle];

  return (
    <View style={containerStyle}>
      <Button style={buttonStyle} disabled={disabled} onPress={onPress}>
        <Text style={textStyle}>{text}</Text>
      </Button>
    </View>
  );
};
