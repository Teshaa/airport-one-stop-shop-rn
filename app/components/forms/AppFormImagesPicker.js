import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageInputList from "../input/ImageInputList";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";

const AppFormImagesPicker = ({ name }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  return (
    <>
      <ImageInputList
        //   Onvert uri to local state objet with property uri
        localImagesList={values[name].map((uri) => ({ uri }))}
        // extract uri from localImage obj
        onImagesListChange={(imageLists) =>
          setFieldValue(
            name,
            imageLists.map(({ uri }) => uri)
          )
        }
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormImagesPicker;

const styles = StyleSheet.create({});
