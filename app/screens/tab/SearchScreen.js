import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { useShop } from "../../api/hooks";
import { useShopContext } from "../../context/hooks";
import { Button, Title, Paragraph } from "react-native-paper";
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import SearchMeals from "../../components/eateries/SearchMeals";
import SearchAccomodation from "../../components/accomodation/SearchAccomodation";

const sliderWidth = Dimensions.get("window").width * 0.63;

const SearchScreen = () => {
  const [currScreen, setCurrScreen] = useState(0);
  return (
    <AppSafeArea>
      <TabsProvider defaultIndex={currScreen} onChangeIndex={setCurrScreen}>
        <Tabs>
          <TabScreen label="Eatery" icon="food">
            <SearchMeals />
          </TabScreen>
          <TabScreen label="Accomodation" icon="bed" disabled>
            <SearchAccomodation />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </AppSafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
