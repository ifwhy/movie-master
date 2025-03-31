import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary">
      <Text className="font-bold text-4xl text-white">Profile</Text>
    </SafeAreaView>
  );
};

export default profile;
