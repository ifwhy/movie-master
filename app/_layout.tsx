import { Stack } from "expo-router";
import "./globals.css";
import { useColorScheme } from "nativewind";
import { StatusBar } from "react-native";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={colorScheme === "light" ? "light-content" : "dark-content"}
        animated={true}
        showHideTransition="fade"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
