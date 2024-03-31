import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "./DateTimePicker";
import { useFormikContext } from "formik";

const FormDateTimePicker = (props) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const _values = values;
  const _errors = errors;

  return (
    <DateTimePicker
      date={new Date(_values[props.name])}
      onDateChanged={(date) => setFieldValue(props.name, date.toISOString())}
      error={_errors[props.name]}
      {...props}
    />
  );
};

export default FormDateTimePicker;

const styles = StyleSheet.create({});
