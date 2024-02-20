import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import DropDown from "../input/DropDown";
import AppErrorMessage from "./AppErrorMessage";

const AppFormDropDown = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  return (
    <>
      <DropDown
        {...otherProps}
        value={values[name]}
        setValue={(getVal) => {
          handleChange(name)(getVal());
        }}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDropDown;

const styles = StyleSheet.create({});
