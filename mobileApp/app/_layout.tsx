// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { AuthProvider } from "../context/auth";

// import { useEffect } from "react";
// import "react-native-reanimated";
// import { useState } from "react";
// import { Slot, Redirect } from "expo-router";

// import { useColorScheme } from "@/hooks/useColorScheme";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }
//   // useEffect(() => {
//   //   // Check if user is authenticated
//   //   // This could be checking for a valid token in AsyncStorage
//   //   checkAuthStatus();
//   // }, []);
//   // const checkAuthStatus = async () => {};
//   if (!isAuthenticated) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />

//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }

import { useEffect, useState } from "react";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "../context/auth";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
