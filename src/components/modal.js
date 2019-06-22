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
    color: "#3C3C3C",
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
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    </View>
  );

  return <View style={styles.wrapper}>{content}</View>;
};
