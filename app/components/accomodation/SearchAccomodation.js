import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../utils/colors";
import { Card, Chip, IconButton, Text } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useAccomodation } from "../../api/hooks";
import moment from "moment/moment";
import RatingBar from "../ratingbar/RatingBar";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

const itemWidth = Dimensions.get("window").width / 2 - 10; // subtracting margin
const itemHeight = Dimensions.get("window").height / 3 - 10; // subtracting margin

const SearchAccomodation = () => {
  const navigation = useNavigation();
  const { getRooms, getCategories, getTags } = useAccomodation();
  const [tags, setTags] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeChips, setActiveChips] = useState([]);
  const [activeCategory, setActiveCtegory] = useState([]);
  const [searchString, setSearchString] = useState();
  const [priceRange, setPriceRange] = useState([4000, 300000]);
  const [showSliderOverlay, setShowSliderOverlay] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [openFilteres, setOpenFilders] = useState(false);

  const fetchAccomodations = async () => {
    const roomsResponse = await getRooms({
      tags: activeChips.join(","),
      type: activeCategory,
      search: searchString,
      price_min: priceRange ? priceRange[0] : null,
      price_max: priceRange ? priceRange[1] : null,
    });
    if (!roomsResponse.ok) {
      console.log("SearchScreen: ", roomsResponse.problem, roomsResponse.data);
    }
    setRooms(roomsResponse.data.results);
  };

  const handlFetch = async () => {
    const tagsResponse = await getTags({ page_size: 1000 });
    const categoryResponse = await getCategories();
    if (!tagsResponse.ok) {
      console.log("SearchScreen: ", tagsResponse.problem, tags.data);
    }
    if (!categoryResponse.ok) {
      console.log(
        "SearchScreen: ",
        categoryResponse.problem,
        categoryResponse.data
      );
    }
    setTags(tagsResponse.data.results);
    setCategories(categoryResponse.data.results);
    setRefreshing(true);
    await fetchAccomodations();
    setRefreshing(false);
  };

  const handleTagClick = (tag) => {
    const tagIndex = activeChips.indexOf(tag);
    if (tagIndex === -1) {
      setActiveChips([...activeChips, tag]);
    } else {
      const activeTags = [...activeChips];
      activeTags.pop(tagIndex);
      setActiveChips(activeTags);
    }
  };

  const handleCategoryClicked = (category) => {
    const index = activeCategory.indexOf(category);
    if (index === -1) {
      setActiveCtegory([...activeCategory, category]);
    } else {
      const cats = [...activeCategory];
      cats.pop(index);
      setActiveCtegory(cats);
    }
    if (activeCategory === category) setActiveCtegory(null);
    else setActiveCtegory(category);
  };

  useEffect(() => {
    handlFetch();
  }, []);

  useEffect(() => {
    fetchAccomodations();
  }, [activeChips, activeCategory, searchString, priceRange]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={setSearchString}
          />
          <IconButton
            style={styles.searchButton}
            icon="magnify"
            mode="outlined"
            onPress={fetchAccomodations}
          />
        </View>
        <IconButton
          onPress={() => setOpenFilders(!openFilteres)}
          style={styles.filterButton}
          icon="filter"
          mode="outlined"
          iconColor={colors.white}
          size={27}
        />
      </View>
      {openFilteres && (
        <View style={styles.filters}>
          {tags?.length > 0 && (
            <>
              <Text style={styles.headers}>Tags</Text>
              <FlatList
                data={tags}
                keyExtractor={({ name }) => name}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: { name } }) => (
                  <Chip
                    style={[
                      styles.chip,
                      activeChips.indexOf(name) !== -1
                        ? { backgroundColor: colors.light }
                        : {},
                    ]}
                    selected={activeChips.indexOf(name) !== -1}
                    showSelectedOverlay
                    onPress={() => {
                      handleTagClick(name);
                    }}
                  >
                    {name}
                  </Chip>
                )}
              />
            </>
          )}
          {categories?.length > 0 && (
            <>
              <Text style={styles.headers}>Room Types</Text>
              <FlatList
                data={categories}
                keyExtractor={({ url }) => url}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: { name, image } }) => (
                  <Chip
                    style={[
                      styles.chip,
                      name === activeCategory
                        ? { backgroundColor: colors.light }
                        : {},
                    ]}
                    selected={name === activeCategory}
                    showSelectedOverlay
                    onPress={() => {
                      handleCategoryClicked(name);
                    }}
                  >
                    {name}
                  </Chip>
                )}
              />
            </>
          )}
          <Text style={styles.headers}>Price Range in Ksh</Text>
          <View style={styles.sliderContainer}>
            <Text variant="bodyLarge" style={styles.prices}>
              {priceRange[0]}
            </Text>
            <MultiSlider
              style={styles.slide}
              sliderLength={Dimensions.get("screen").width * 0.63}
              max={1000000}
              min={0}
              values={priceRange}
              onValuesChangeStart={() => setShowSliderOverlay(true)}
              step={100}
              enableLabel={showSliderOverlay}
              containerStyle={{ paddingHorizontal: 10 }}
              onValuesChangeFinish={(values) => {
                setPriceRange(values);
                setShowSliderOverlay(false);
              }}
            />
            <Text variant="bodyLarge" style={styles.prices}>
              {priceRange[1]}
            </Text>
          </View>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <FlatList
          data={rooms}
          numColumns={2}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            const {
              number,
              description,
              images,
              hotel: { name },
              type: { name: category },
              updated_at,
              rating,
              price_per_night,
            } = item;
            return (
              <Card
                onPress={() => {
                  navigation.navigate(routes.PRODUCT_NAVIGATION, {
                    screen: routes.ACCOMODATION_SCREEN,
                    params: item,
                  });
                }}
                style={[
                  {
                    width: itemWidth,
                    /*height: itemHeight,*/ margin: 5,
                  },
                ]}
              >
                <Card.Content>
                  <Text variant="titleMedium">{`${name}-${number}`}</Text>
                  <Text variant="bodyMedium" style={{ color: colors.medium }}>
                    {category}
                  </Text>
                </Card.Content>
                <Card.Cover
                  source={{
                    uri: images[0].image ?? "https://placehold.co/600x400",
                  }}
                  resizeMode="cover"
                />
                <Card.Actions>
                  <Text style={{ color: colors.medium }}>
                    {`${moment(updated_at).format("Do MMM YYYY")} | `}
                  </Text>
                  <RatingBar starSize={15} defaultRating={rating} disabled />
                  <Text>({rating})</Text>
                </Card.Actions>
                <Card.Actions
                  style={{
                    flexDirection: "row-reverse",
                  }}
                >
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    Ksh. {price_per_night}
                  </Text>
                </Card.Actions>
              </Card>
            );
          }}
          refreshing={refreshing}
          onRefresh={handlFetch}
        />
      </View>
    </View>
  );
};

export default SearchAccomodation;

const styles = StyleSheet.create({
  prices: {
    fontWeight: "bold",
  },
  headers: {
    fontWeight: "bold",
    color: colors.medium,
    padding: 5,
  },
  slide: {
    width: "50%",
    backgroundColor: "red",
  },
  sliderContainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  search: {
    backgroundColor: colors.white,
    flexDirection: "row",
    borderRadius: 10,
    flex: 1,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  searchButton: {
    borderRadius: 10,
    backgroundColor: colors.light,
  },
  filterButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  header: {
    margin: 10,
    flexDirection: "row",
  },
  chip: {
    backgroundColor: colors.white,
    margin: 3,
  },
  filters: {
    padding: 10,
  },
});
