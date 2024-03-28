import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { default as CommunityDateTimePicker } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";
import { Pressable } from "react-native";
import { TouchableHighlight } from "react-native";

const DateTimePicker = ({
  label = "Date",
  value,
  onChangeValue,
  icon,
  defaultMode = "time",
  is24Hrs = true,
  formarter, //required
}) => {
  const { colors, roundness } = useTheme();
  const [dateTime, setDateTime] = useState({
    date: null,
    time: null,
    currMode:
      defaultMode === "date" || defaultMode === "time" ? defaultMode : "date",
    show: false,
  });
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      // if default mode is date or time
      if (defaultMode !== "datetime") {
        setDateTime({ ...dateTime, show: false });
        if (onChangeValue instanceof Function)
          return onChangeValue(selectedDate);
      }
      // if default mode is datetime
      if (dateTime.currMode === "date") {
        // 1st capture date, set it and return
        return setDateTime({
          ...dateTime,
          date: selectedDate,
          currMode: "time",
          show: true,
        });
      } else {
        // last Capture time set it
        setDateTime({
          ...dateTime,
          time: selectedDate,
          currMode: "date",
          show: false,
        });
        if (onChangeValue instanceof Function) {
          // Combine the 2 to form 1
          const date = new Date(dateTime.date);
          const time = new Date(selectedDate); // Use selectedDate here

          onChangeValue(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              time.getHours(),
              time.getMinutes(),
              time.getSeconds()
            )
          );
        }
        // reset state
        setDateTime({
          ...dateTime,
          date: null,
          time: null,
          currMode: "date",
          show: false,
        });
      }
    }
  };

  const showPicker = () => {
    setDateTime({ ...dateTime, show: true });
  };

  return (
    <View style={styles.component}>
      {value && label && (
        <Text
          style={[
            styles.label,
            {
              backgroundColor: colors.background,
              color: colors.onSurfaceVariant,
            },
          ]}
          variant="labelSmall"
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          { borderRadius: roundness, borderColor: colors.outline },
        ]}
      >
        <View style={styles.inputContainer}>
          {icon && (
            <TouchableHighlight
              underlayColor={colors.disabled}
              style={{ borderRadius: 10 }}
              onPress={showPicker}
            >
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={colors.outline}
              />
            </TouchableHighlight>
          )}
          <TouchableOpacity onPress={showPicker} style={{ flex: 1 }}>
            <Text variant="labelLarge" style={styles.textInput}>
              {value ? formarter(value) : label}
            </Text>
          </TouchableOpacity>
          {dateTime.show && (
            <CommunityDateTimePicker
              value={value || new Date()}
              mode={dateTime.currMode}
              is24Hour={is24Hrs}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  label: {
    left: 10,
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 5,
  },
  component: {
    marginTop: 5,
  },
  container: {
    borderWidth: 1,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
});