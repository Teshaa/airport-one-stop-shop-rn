import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../input/AppButton";

function AppFormSubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} {...otherProps}/>;
}

export default AppFormSubmitButton;
