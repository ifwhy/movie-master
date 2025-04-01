import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import ThemeToggle from "@/components/ThemeToggle";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useColorScheme } from "nativewind";

const search = () => {
  const { colorScheme } = useColorScheme();

  const [querySearch, setQuerySearch] = useState<string>("");
  const {
    data = [],
    error,
    loading,
    refetch: loadMoviesSearched,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: querySearch,
      }),
    false
  );

  useEffect(() => {
    // debounching the search input
    const debounching = setTimeout(async () => {
      if (querySearch.trim()) {
        await loadMoviesSearched();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(debounching);
  }, [querySearch]);

  return (
    <SafeAreaView className="flex flex-1 bg-primary dark:bg-white">
      <Image source={images.bg} className="absolute w-full top-0 z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <ThemeToggle />
        <View className="flex flex-row items-center justify-center mt-5">
          <Image source={icons.logo} className="w-12 h-10" />

          <Text className="text-white font-bold text-2xl dark:text-black">
            {"  "}
            Movie Master
          </Text>
        </View>

        <View className="mt-5">
          <SearchBar
            placeholder="Search for movies..."
            value={querySearch}
            onChangeText={(text) => setQuerySearch(text)}
          />
        </View>

        {loading ? (
          <View className="h-full flex-1 justify-center items-center">
            <ActivityIndicator
              size="large"
              color={colorScheme === "light" ? "#FFFFFF" : "#030014"}
              className="self-center"
            />
            <Text className="text-white dark:text-primary font-light mt-2">
              Loading...
            </Text>
          </View>
        ) : error ? (
          <Text className="font-bold text-white text-lg text-center mt-12">
            Error: {error.message}
          </Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-5 pb-16"
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              querySearch.trim() && data?.length! > 0 ? (
                <Text className="font-bold text-white dark:text-primary text-lg mt-5 mb-3">
                  Movies related to {querySearch}
                </Text>
              ) : null
            }
            ListEmptyComponent={
              querySearch.trim() ? (
                <Text className="font-bold text-center text-white dark:text-primary text-md mt-12">
                  No Data Found
                </Text>
              ) : (
                <Text className="text-base font-semibold text-center">
                  Search for a movie
                </Text>
              )
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default search;
