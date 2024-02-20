import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageInput from "../input/ImageInput";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";

const AppFormImagePicker = ({ name }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  return (
    <>
      <ImageInput
        localImage={values[name] ? { uri: values[name] } : null}
        onImageChange={(image) => {
          if (image) {
            setFieldValue(name, image.uri);
          } else {
            setFieldValue(name, "");
          }
        }}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormImagePicker;

const styles = StyleSheet.create({});
