import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Bookmark, House, Search } from "lucide-react-native";

type TabIconType = {
  focused: boolean;
  title: string;
  icon: React.ReactElement;
  iconFocused: React.ReactElement;
};

const TabIcon = ({ focused, icon, title, iconFocused }: TabIconType) => {
  return (
    <View className="justify-center items-center h-full w-full rounded-full">
      <View className="flex flex-col items-center my-auto transition-all duration-200 ease-in-out">
        {focused ? (
          <>
            <View className="opacity-100">{iconFocused}</View>
            <Text className="text-xs w-full text-center font-semibold text-white">
              {title}
            </Text>
          </>
        ) : (
          <>
            <View className="opacity-60">{icon}</View>
            <Text className="text-xs w-full text-center font-semibold text-slate-600 dark:text-slate-400">
              {title}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          width: "100%",
          height: 56,
          position: "absolute",
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<House size={26} color="#A8B5DB" />}
              iconFocused={<House size={26} color="#FFFFFF" />}
              title="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Search size={26} color="#A8B5DB" />}
              iconFocused={<Search size={26} color="#FFFFFF" />}
              title="Search"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Bookmark size={26} color="#A8B5DB" />}
              iconFocused={<Bookmark size={26} color="#FFFFFF" />}
              title="Save"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Ionicons name="person-outline" size={26} color="#A8B5DB" />
              }
              iconFocused={<Ionicons name="person" size={26} color="#FFFFFF" />}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
