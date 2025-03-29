import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="font-bold text-4xl text-white">Detail ID : {id}</Text>
    </View>
  );
};

export default MovieDetails;
