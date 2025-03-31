import {
  View,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "@/components/ThemeToggle";
import { useColorScheme } from "nativewind";

const index = () => {
  const router = useRouter();
  const { data, error, loading } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="relative flex-1 h-full bg-primary dark:bg-white">
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

        <View className="flex-1 flex items-center justify-center">
          {loading ? (
            <View className="h-full flex-1 justify-center items-center">
              <ActivityIndicator
                size="large"
                color={colorScheme === "light" ? "#FFFFFF" : "#030014"}
                className="self-center"
              />
              <Text className="text-white dark:text-primary mt-2">
                Loading...
              </Text>
            </View>
          ) : error ? (
            <Text className="font-bold text-white text-lg text-center mt-12">
              Error: {error.message}
            </Text>
          ) : !data ? (
            <Text className="font-bold text-white text-lg text-center mt-12">
              No Data Found
            </Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                placeholder="Search for movies..."
                onPress={() => router.push("/search")}
              />

              <View>
                <Text className="text-lg text-white dark:text-primary font-bold mt-5 mb-3">
                  Latest Movies
                </Text>

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
                  className="mt-2 pb-16"
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
