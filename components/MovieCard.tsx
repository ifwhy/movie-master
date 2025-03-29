import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text
          className="text-sm font-bold text-white mt-2 dark:text-black"
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className="flex-row items-center justify-between gap-x-1">
          <View className="flex flex-row gap-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase dark:text-black">
              {(vote_average / 2).toPrecision(2)}
            </Text>
          </View>
          <Text className="text-xs text-white font-semibold mt-1 dark:text-black">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
