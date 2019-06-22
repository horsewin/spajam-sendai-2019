import * as React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import config from "../constants/config";

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1
  },
  content: {
    flexDirection: "column"
  },
  contentFlex: {
    flex: 1
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center"
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
  wrapper: {
    backgroundColor: config.color.keyColor,
    elevation: 0
  },
  container: {
    backgroundColor: config.color.greyColor,
    justifyContent: "center"
  }
});

export const ModalPage = () => {
  const content = (
    <View style={[styles.container, { marginTop: 300 }]}>
      <View style={styles.flexText}>
        <Text style={[styles.h2, styles.marginBottom]}>送信中です</Text>
      </View>
      <View>
        <ActivityIndicator size="large" color="#F4A626" />
      </View>
    </View>
  );

  return <View style={styles.wrapper}>{content}</View>;
};
