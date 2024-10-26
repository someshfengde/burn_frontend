import { Stack, Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar translucent={false} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { paddingTop: StatusBar.currentHeight },
          }}
        />
      </Stack>
    </>
  );
}
