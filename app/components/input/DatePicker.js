import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import CommunityDateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, HelperText } from "react-native-paper";

const DateTimePicker = ({
  date,
  onDateChanged,
  formater,
  label,
  prefixIcon,
  surfixIcon,
  onPrefixIconPressed,
  onSurfixIconPressed,
  mode = "date",
  display = "default",
  variant = "flat",
  error,
  helpText,
}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [androidDateTime, setAndroidDateTime] = useState({
    date: date,
    time: date,
    currentMode: "date",
  });

  const onChange = (event, date) => {
    if (date) onDateChanged(date);
    setIsPickerShow(false);
    setAndroidDateTime({ date: date, time: date, currentMode: "date" });
  };

  const toggleShowPicker = () => {
    setIsPickerShow(!isPickerShow);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleShowPicker}>
        <TextInput
          error={Boolean(error)}
          label={label}
          mode={variant}
          value={formater ? formater(date) : date.toISOString()}
          editable={false}
          left={
            prefixIcon && (
              <TextInput.Icon
                icon={prefixIcon}
                onPress={
                  onPrefixIconPressed ? onPrefixIconPressed : toggleShowPicker
                }
              />
            )
          }
          right={
            surfixIcon && (
              <TextInput.Icon
                icon={surfixIcon}
                onPress={
                  onSurfixIconPressed ? onSurfixIconPressed : toggleShowPicker
                }
              />
            )
          }
        />
      </TouchableOpacity>
      {(error || helpText) && (
        <HelperText type={error ? "error" : "info"} visible={Boolean(error)}>
          {error ? error : helpText}
        </HelperText>
      )}

      {Platform.OS === "android" && isPickerShow && (
        <CommunityDateTimePicker
          display={display}
          mode={mode === "datetime" ? androidDateTime.currentMode : mode}
          value={date}
          onChange={(event, date) => {
            if (mode === "datetime") {
              if (androidDateTime.currentMode === "date") {
                setAndroidDateTime((initialValue) => ({
                  ...initialValue,
                  date: date || new Date(),
                  currentMode: "time",
                }));
              }
              if (androidDateTime.currentMode === "time") {
                setAndroidDateTime((initialValue) => ({
                  ...initialValue,
                  time: date || new Date(),
                }));
              }
              if (androidDateTime.currentMode === "time") {
                onChange(
                  event,
                  new Date(
                    androidDateTime.date.getFullYear(),
                    androidDateTime.date.getMonth(),
                    androidDateTime.date.getDate(),
                    androidDateTime.time.getHours(),
                    androidDateTime.time.getMinutes(),
                    androidDateTime.time.getSeconds(),
                    androidDateTime.time.getMilliseconds()
                  )
                );
              }
            } else {
              onChange(event, date);
            }
          }}
        />
      )}
      {Platform.OS === "ios" && isPickerShow && (
        <CommunityDateTimePicker
          display={display}
          mode={mode}
          value={date}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
