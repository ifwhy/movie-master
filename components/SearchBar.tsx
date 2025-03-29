import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: SearchBarProps) => {
  return (
    <View className="flex-row items-center justify-between bg-dark-200 rounded-full px-4 py-2 border border-slate-400">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"#94a3b8"}
        className="flex-1 ml-2 dark:text-white text-black"
      />
    </View>
  );
};

export default SearchBar;
