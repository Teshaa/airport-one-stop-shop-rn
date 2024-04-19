import {
  useForegroundPermissions,
  getLastKnownPositionAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useState, useEffect } from "react";

export default useLocation = () => {
  const [status, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { granted } = await requestPermission();
        if (!granted) {
          alert(
            "Your need to grant app location permision to store your location info and allow client locate you"
          );
        } else {
          // Very accurate bt takes some time to retrieve the
          const {
            coords: { latitude, longitude },
          } = await getCurrentPositionAsync();
          setLocation({ latitude, longitude });
          // you could use altternative which is first but not much accurate since it uses the last know as name suggenst
          // const {coords: { latitude, longitude }} = await getLastKnownPositionAsync();
          // console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return location;
};
export const useLocationSubscription = () => {};
