import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { httpService, useShop, useUser } from "../../api/hooks";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import { useShopContext, useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import ScrollableIconButtons from "../../components/button/ScrollableIconButtons";
import routes from "../../navigation/routes";
import Product from "../../components/product/Product";
import { services } from "../../utils/constants";
import SearchBar from "../../components/input/SearchBar";
import AccomodationCard from "../../components/accomodation/AccomodationCard";
import Accomodations from "../../components/accomodation/Accomodations";
import FoodCategories from "../../components/eateries/FoodCategories";

const HomeScreen = ({ navigation }) => {
  const { getCategories, getProducts } = useShop();
  const { products, setProducts, setCategories } = useShopContext();
  const { user } = useUserContext();
  const { getUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [paginator, setPaginator] = useState({
    next: null,
    previous: null,
    count: 0,
    page_size: 10,
  });

  const handleFetch = async () => {
    setRefreshing(true);
    const categoryResponse = await getCategories({
      page_size: paginator.page_size,
    });
    const productResponse = await getProducts();
    setRefreshing(false);
    if (!categoryResponse.ok) {
      console.log(
        "Home screen: ",
        categoryResponse.problem,
        categoryResponse.data
      );
    }
    const {
      data: { results: categoryResult },
    } = categoryResponse;
    setCategories(categoryResult);

    if (!productResponse.ok) {
      console.log(
        "Home screen: ",
        productResponse.problem,
        productResponse.data
      );
    }
    const {
      data: { results: productResult, count, next, previous },
    } = productResponse;
    setPaginator({ ...paginator, count, previous, next });
    setProducts(productResult);
  };

  const handlePagination = async ({ distanceFromEnd }) => {
    if (!paginator.next || loading || refreshing) {
      return;
    }
    setLoading(true);
    const response = await httpService.get(paginator.next);
    setLoading(false);
    if (!response.ok) {
      console.log("HomeScreen", response.problem, response.data);
    } else {
      const {
        data: { results: productResult, count, next, previous },
      } = response;
      setPaginator({ ...paginator, count, previous, next });
      setProducts([...products, ...productResult]);
    }
  };

  useEffect(() => {
    if (!user) getUser();
    handleFetch();
  }, []);

  return (
    <AppSafeArea>
      <View style={styles.headerontainer}>
        <IconButton
          icon="menu"
          // iconColor={colors.white}
          onPress={() => {
            navigation.navigate(routes.SEARCH_SCREEN);
          }}
          size={30}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.PROFILE_SCREEN,
              params: user,
            })
          }
        >
          {user && user.profile.image ? (
            <Avatar.Image source={{ uri: user.profile.image }} size={45} />
          ) : (
            <Avatar.Icon
              icon="account"
              size={45}
              style={{ backgroundColor: colors.light }}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text variant="headlineLarge" style={{ padding: 10 }}>
        Welcome {user?.username ?? ""} 👋
      </Text>
      <View style={{ padding: 10 }}>
        <SearchBar />
      </View>
      <ScrollableIconButtons
        title="Services"
        data={services}
        imageExtractor={({ image }) => image}
        keyExtractor={({ id }) => id}
        titleExtractor={({ title }) => title}
        selectable={false}
        onItemClicked={(item) => {
          console.log(item);
        }}
        disabled
      />

      <Accomodations />
      <View style={styles.productsContainer}>
        <FoodCategories />
      </View>
      {/* <View style={styles.productsContainer}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={({ url }) => url}
          onEndReached={handlePagination}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleFetch}
          contentContainerStyle={{
            alignItems: "center",
          }}
          renderItem={({ item }) => {
            return <Product product={item} />;
          }}
          ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
        />
      </View> */}
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchButn: {
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
  },
  productsContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
  },
});
