import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import colors from "../../utils/colors";
import IconText from "./IconText";

const ExpandableText = ({
  threshHold,
  text,
  contentStyle,
  color = colors.medium,
  size = 20,
  title,
}) => {
  const [expanded, setExpanded] = useState(false);
  let displayText = "";
  if (text) {
    displayText = expanded ? text : `${text}`.slice(0, threshHold);
  }
  return (
    <View>
      {title && (
        <Text style={{ fontWeight: "bold", paddingHorizontal: 10 }}>
          {title}
        </Text>
      )}
      <Text style={[styles.container, contentStyle]}>{displayText}</Text>
      {text && text.length > threshHold && (
        <View style={styles.button}>
          <IconText
            left={false}
            icon={expanded ? "chevron-up" : "chevron-down"}
            size={15}
            text={expanded ? "Less" : "More"}
            onPress={() => setExpanded(!expanded)}
            color={color}
          />
        </View>
      )}
    </View>
  );
};

export default ExpandableText;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
  },
});
