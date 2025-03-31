import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import { ThumbsUp } from "lucide-react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const { colorScheme } = useColorScheme();

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Text
          className="text-base font-bold text-white my-1 dark:text-black text-center"
          numberOfLines={1}
        >
          {title}
        </Text>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <View className="flex-row items-center justify-between gap-x-1">
          <View className="flex flex-row justify-center items-center gap-1">
            <ThumbsUp
              size={12}
              color={colorScheme === "light" ? "#FFFFFF" : "#030014"}
            />
            <Text className="text-xs text-white font-bold uppercase dark:text-black">
              {(vote_average * 10).toPrecision(3)}%
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
