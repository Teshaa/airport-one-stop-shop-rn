import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Modal,
} from "react-native";
import {
  Card,
  Divider,
  IconButton,
  List,
  Text,
  Button,
  Avatar,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useShop } from "../../api/hooks";
import ExpandableText from "../../components/display/ExpandableText";
import ScrollableThumbnails from "../../components/ScrollableThumbnails";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import IconText from "../../components/display/IconText";
import { launchGoogleMapsNavigation } from "../../utils/helpers";
const HotelDetailScreen = ({ navigation, route }) => {
  const {
    url,
    id,
    name,
    logo,
    longitude,
    latitude,
    address,
    images,
    description,
  } = route.params;
  const [imageModalState, setImageModalState] = useState({
    show: false,
    currImage: images[0].image,
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "black",
            marginBottom: 50,
          }}
        >
          <ImageBackground
            source={{ uri: images[0].image }}
            style={{
              width: "100%",
              height: "100%",
              opacity: 0.5,
              position: "absolute",
            }}
          />
          <Image
            source={{ uri: logo }}
            style={{
              height: 100,
              width: 100,
              position: "absolute",
              borderRadius: 50,
              bottom: -50,
              left: 10,
              zIndex: 100,
              backgroundColor: "gray",
            }}
          />
        </View>
        <Card.Title
          titleVariant="titleLarge"
          title={name}
          subtitle={address}
          //   left={(props) => <List.Icon {...props} icon={"google-maps"} />}
        />
        <Divider />
        <IconText icon={"image"} text={"Images"} style={{ margine: 20 }} />
        <ScrollableThumbnails
          uris={[...images.map(({ image: img }) => img)]}
          onPress={(uri) =>
            setImageModalState({
              ...imageModalState,
              show: true,
              currImage: uri,
            })
          }
        />
        <IconText icon={"google-maps"} text={"Location"} />
        <Card
          style={{
            width: "98%",
            height: 200,
            alignSelf: "center",
            overflow: "hidden",
            margin: 10,
          }}
        >
          <MapView
            initialRegion={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{ with: "100%", height: "100%" }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              }}
              title={name}
              style={{ width: 50, height: 50 }}
            />
          </MapView>
          {/* <Card.Actions>
           
            <Button
              onPress={() => launchGoogleMapsNavigation(latitude, longitude)}
            >
              View in google map
            </Button>
          </Card.Actions> */}
        </Card>
        <List.Item
          title={"Description"}
          description={(props) => (
            <ExpandableText threshHold={200} text={description} />
          )}
          //   left={(props) => <List.Icon {...props} icon={"google-maps"} />}
        />
        {/* <IconText icon={"food"} text={"Products"} style={{ margine: 20 }} /> */}
      </ScrollView>
      <Modal
        visible={imageModalState.show}
        onRequestClose={() =>
          setImageModalState({ ...imageModalState, show: false })
        }
      >
        <View style={{ flex: 1 }}>
          <IconButton
            icon={"close"}
            style={{ alignSelf: "flex-end" }}
            onPress={() =>
              setImageModalState({ ...imageModalState, show: false })
            }
          />
          <ImageBackground
            source={{ uri: imageModalState.currImage ?? images[0].image }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      </Modal>
    </View>
  );
};

export default HotelDetailScreen;

const styles = StyleSheet.create({});
