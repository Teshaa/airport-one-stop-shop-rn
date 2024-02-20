import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import ImageInput from "./ImageInput";

const ImageInputList = ({ localImagesList = [], onImagesListChange }) => {
  // Gives us reference to scroll view object eneabling us call its methods in this case scroll toend
  const scrollViewRef = useRef();
  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd();
        }}
      >
        <View style={styles.container}>
          {localImagesList.map((localImage, index) => (
            <View style={styles.item} key={index}>
              <ImageInput
                radiusScaleFactor={0.25}
                localImage={localImage}
                onImageChange={(image) => {
                  if (image) {
                    // add an image
                    onImagesListChange([...localImagesList, image]);
                  } else {
                    // delete this image
                    onImagesListChange(
                      localImagesList.filter(
                        (img) => img.uri !== localImage.uri
                      )
                    );
                  }
                }}
              />
            </View>
          ))}
          <View style={styles.item}>
            <ImageInput
              onImageChange={(image) =>
                onImagesListChange([...localImagesList, image])
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageInputList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    margin: 10,
  },
});
