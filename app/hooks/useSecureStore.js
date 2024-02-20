import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const useSecureStore = (key, initialValue) => {
  const prefix = "cache_secure_";
  const [valueStored, setValueToStore] = useState(initialValue);
  const [clear, setClear] = useState(false);
  // console.log(prefix + key, ": {initial: ", initialValue, ", actual: ", valueStored,"}");
  //   only called once to update store value to the one in secure store
  useEffect(() => {
    (async () => {
      try {
        const val = await SecureStore.getItemAsync(prefix + key);
        const item = JSON.parse(val);
        if (item) {
          setValueToStore(item);
        }
      } catch (error) {
        console.log("Error: " + "useSecureStore->Get", error);
      }
    })();
  }, []);

  // excecuted every time value in secure store changes to update its value
  useEffect(() => {
    if (valueStored) {
      asyncStore(valueStored);
    }
  }, [valueStored]);

  useEffect(() => {
    if (clear) {
      setValueToStore(null);
      asyncDelete();
      setClear(false);
    }
  }, [clear]);

  const asyncStore = async (value) => {
    try {
      await SecureStore.setItemAsync(prefix + key, JSON.stringify(value));
    } catch (error) {
      console.log("Error: " + "useSecureStore->Set", error);
    }
  };

  const asyncDelete = async () => {
    try {
      await SecureStore.deleteItemAsync(prefix + key);
    } catch (error) {
      console.log("Error: " + "useSecureStore->Delete", error);
    }
  };

  return [valueStored, setValueToStore, setClear];
};

export default useSecureStore;
