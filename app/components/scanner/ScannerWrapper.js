import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import Scanner from "./Scanner";

const ScannerWrapper = ({ children, onScaned }) => {
  const [show, setShow] = useState(false);
  return (
    <TouchableOpacity onPress={() => setShow(true)}>
      {children}
      <Modal
        visible={show}
        onRequestClose={(onRequestClose) => setShow(false)}
        animationType="slide"
      >
        <Scanner
          onScanned={({ type, data }) => {
            setShow(false);
            if (onScaned instanceof Function) {
              onScaned(data);
            }
          }}
          requestCancel={() => setShow(false)}
        />
      </Modal>
    </TouchableOpacity>
  );
};

export default ScannerWrapper;

const styles = StyleSheet.create({});
