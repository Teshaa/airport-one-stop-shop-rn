import React, { useState } from "react";
import { useFormikContext } from "formik";
import { zip } from "../../utils/helpers";
import AppErrorMessage from "./AppErrorMessage";
import Picker from "../input/Picker";

function AppFormPicker({
  placeHolder,
  icon,
  layout = "linear",
  keyExtractor,
  data,
  children,
  defaultIndex,
  displayExractor,
  itemValueExtractor,
  name,
  itemStyle,
  contentContainerStyle,
}) {
  const { setFieldValue, errors, values, touched } = useFormikContext();
  return (
    <>
      <Picker
        itemStyle={itemStyle}
        contentContainerStyle={contentContainerStyle}
        placeHolder={placeHolder}
        icon={icon}
        data={data}
        layout={layout}
        displayExractor={displayExractor}
        keyExtractor={keyExtractor}
        defaultIndex={defaultIndex}
        onSelectedItemChange={(item) => {
          //Called first when the picher is rendered and all through its life when value selected changes
          if (item) {
            setFieldValue(name, itemValueExtractor(item));
          }
        }} //called and passed the item whwnever a new item is selected, gives you acces to inside
      >
        {/* child whick is a function with parametered is fed to the picker and 
        internally it calls it and passes it item by item */}
        {children}
      </Picker>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
