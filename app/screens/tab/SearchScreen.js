import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import SearchMeals from "../../components/eateries/SearchMeals";
import SearchAccomodation from "../../components/accomodation/SearchAccomodation";
import { TabView, SceneMap } from "react-native-tab-view";
import colors from "../../utils/colors";

const renderScene = SceneMap({
  first: SearchMeals,
  second: SearchAccomodation,
});

const SearchScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Meals" },
    { key: "second", title: "Accomodation" },
  ]);
  return (
    <AppSafeArea>
      <TabView
      
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </AppSafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
