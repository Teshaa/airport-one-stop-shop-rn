import { Modal, StyleSheet, Text, View, PanResponder } from "react-native";
import React, { useRef, useState } from "react";

const Dialog = ({ children, swipable, onDismiss, visible, onRequestClose }) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Handle the swipe down gesture here (optional)
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1) {
          // Close the modal on swipe down
          if (onRequestClose instanceof Function) {
            onRequestClose();
            if (onDismiss instanceof Function) {
              onDismiss();
            }
          }
        }
      },
    })
  ).current;
  return (
    <Modal
      transparent
      visible={visible}
      animationType={swipable ? "slide" : "fade"}
      onRequestClose={onRequestClose}
      onDismiss={onDismiss}
    >
      <View style={styles.screen} {...panResponder.panHandlers}>
        <View style={styles.dialog}>
          <View style={styles.dialogBody} {...panResponder.panHandlers}>
            {children}
          </View>
          <View style={styles.dialogActions}></View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#00000096",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    borderRadius: 30,
    overflow: "hidden",
    padding: 20,
    backgroundColor: "#ffff",
  },
  dialogTitle: {
    fontWeight: "bold",
    padding: 10,
  },
  dialogActions: {},
  dialogBody: {},
});
