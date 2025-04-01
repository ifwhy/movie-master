import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useColorScheme } from "nativewind";
import ThemeToggle from "@/components/ThemeToggle";
import { ThumbsUp, Undo2Icon } from "lucide-react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="dark:text-black text-white font-normal text-sm">
      {label}
    </Text>
    <Text className="dark:text-black text-justify text-white font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading)
    return (
      <SafeAreaView className="bg-primary h-screen dark:bg-white flex-1">
        <ActivityIndicator />
        <Text className="text-primary dark:text-white font-semibold text-lg">
          Loading...
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary relative dark:bg-white flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[450px] z-0"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>

          <View className="dark:bg-slate-300 bg-primary right-5 top-5 w-max h-max absolute z-5 rounded-full">
            <ThemeToggle />
          </View>

          <View className="dark:bg-slate-300 bg-primary left-5 top-5 w-max h-max absolute z-5 rounded-full">
            <Link onPress={() => router.back()} href="/" className="p-2">
              <Undo2Icon
                color={colorScheme === "light" ? "#FFFFFF" : "#030014"}
                size={24}
              />
            </Link>
          </View>
        </View>

        <View className="flex flex-col items-start justify-center mt-5 px-5">
          <View className="flex flex-row justify-between items-center w-full flex-wrap">
            <Text className="text-white dark:text-black font-bold text-2xl">
              {movie?.title}
            </Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-white dark:text-black text-lg">
                {movie?.release_date?.split("-")[0]} •
              </Text>
              <Text className="text-white dark:text-black text-lg">
                {movie?.runtime}m
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-gray-200 px-2 py-1 rounded-md gap-x-1 mt-2">
            <ThumbsUp size={12} color={"#030014"} />
            <Text className="text-primary font-bold text-sm">
              {(movie?.vote_average ? movie.vote_average * 10 : 0).toPrecision(
                3
              )}
              %
            </Text>
            <Text className="text-primary text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((g: { name: any }) => g.name).join(" • ") ||
              "N/A"
            }
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: { name: any }) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 peer"
        onPress={router.back}
        activeOpacity={0.8}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={colorScheme === "dark" ? "#fff" : "#030014"}
        />
        <Text className="dark:text-white text-primary font-semibold text-base peer-hover:text-white peer-hover:dark:text-primary">
          Go Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Details;
