import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { httpService, useAirpot, useShop, useUser } from "../../api/hooks";
import {
  ActivityIndicator,
  Avatar,
  Button,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import { useShopContext, useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import ScrollableIconButtons from "../../components/button/ScrollableIconButtons";
import routes from "../../navigation/routes";
import SearchBar from "../../components/input/SearchBar";
import Accomodations from "../../components/accomodation/Accomodations";
import FoodCategories from "../../components/eateries/FoodCategories";
import Hotels from "../../components/accomodation/Hotels";
import Restaurants from "../../components/eateries/Restaurants";

const HomeScreen = ({ navigation }) => {
  const { getCategories, getProducts } = useShop();
  const { getServices, getTerminal } = useAirpot();
  const { products, setProducts, setCategories } = useShopContext();
  const { user } = useUserContext();
  const { getUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [services, setService] = useState([]);
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

    const serviceResponse = await getServices();
    if (!serviceResponse.ok) {
      console.log(
        "Home screen: ",
        serviceResponse.problem,
        serviceResponse.data
      );
    } else {
      setService(serviceResponse.data.results);
    }
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
      <ScrollView>
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
        <Text variant="headlineSmall" style={{ padding: 10 }}>
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
        <Restaurants />
        <Accomodations />
        <View style={styles.productsContainer}>
          <FoodCategories />
        </View>
      </ScrollView>
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
