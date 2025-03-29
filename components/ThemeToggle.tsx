import React, { useEffect } from "react";
import { useColorScheme } from "nativewind";
import { Toggle, ToggleIcon } from "./Toggle";
import { Moon, Sun } from "lucide-react-native";
import { Text } from "react-native";

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme("dark");
  }, []);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Toggle
      pressed={colorScheme === "light"}
      onPressedChange={toggleColorScheme}
      aria-label="Toggle"
      variant="default"
      className="mt-5 bg-transparent fixed top-0"
    >
      <ToggleIcon icon={colorScheme === "light" ? Moon : Sun} size={24} />
    </Toggle>
  );
}

export default ThemeToggle;
