import React from "react";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import TextInputField from "../input/TextInputField";
import PasswordInputField from "../input/PasswordInputField";

function AppFormField({ name, password, ...otherProps }) {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  return (
    <>
      {password ? (
        <PasswordInputField
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          value={values[name] ? `${values[name]}` : ""}
          {...otherProps}
        />
      ) : (
        <TextInputField
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          value={values[name] ? `${values[name]}` : ""}
          {...otherProps}
        />
      )}
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
