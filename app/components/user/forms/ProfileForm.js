import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppForm from "../../forms/AppForm";
import { getFormFileFromUri } from "../../../utils/helpers";
import AppFormField from "../../forms/AppFormField";
import AppFormImagePicker from "../../forms/AppFormImagePicker";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import AppFormDropDown from "../../forms/AppFormDropDown";
import { useUser } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
import { useNavigation } from "@react-navigation/native";

import * as Yup from "yup";
const validationSchemer = Yup.object().shape({
  first_name: Yup.string().label("First Name"),
  last_name: Yup.string().label("Last Name"),
  image: Yup.string().label("Image").required(),
  gender: Yup.string().label("Gender").required(),
  phone_number: Yup.string().label("Phone number").required(),
});

const ProfileForm = ({ initial }) => {
  const { setUser } = useUserContext();
  const { putUser } = useUser();
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values, { setFieldError }) => {
    // return console.log(values);
    setLoading(true)
    const { image, first_name, last_name, gender, phone_number } = values;
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("profile.gender", gender);
    formData.append("profile.phone_number", phone_number);
    formData.append("profile.image", getFormFileFromUri(image));
    const resp = await putUser(formData);
    setLoading(false)
    if (!resp.ok) {
      if (resp.problem === "CLIENT_ERROR") {
        for (const key in resp.data) {
          const element = resp.data[key];
          if (element instanceof Array) {
            setFieldError(key, element.join(";"));
          } else if (element instanceof Object) {
            for (const key1 in element) {
              const element1 = element[key1];
              setFieldError(key1, element1.join(";"));
            }
          }
        }
        return;
      }
      return console.log(resp.problem);
    }
    setUser(resp.data);
    navigation.goBack()
  };
  const [genderOptions, setGenderOptions] = useState([
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]);

  return (
    <View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={initial}
        onSubmit={handleSubmit}
      >
        <View style={{ alignItems: "center" }}>
          <AppFormImagePicker name="image" />
        </View>
        <AppFormField
          name="first_name"
          placeholder="Enter first name"
          icon="account-edit"
        />
        <AppFormField
          name="last_name"
          placeholder="Enter last name"
          icon="account-edit"
        />
        <AppFormField
          name="phone_number"
          placeholder="Enter phone number"
          icon="phone"
        />
        <AppFormDropDown
          name="gender"
          icon="human-edit"
          placeholder="Gender"
          data={genderOptions}
          setData={setGenderOptions}
        />
        <AppFormSubmitButton title="Update" loading={loading}/>
      </AppForm>
    </View>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({});
