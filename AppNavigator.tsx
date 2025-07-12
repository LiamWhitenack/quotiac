import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CodiacApp from "./App";

export type RootStackParamList = {
  Puzzle: { date?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer
      linking={{
        prefixes: ["http://localhost:8081", "https://codiac.expo.app"],
        config: {
          screens: {
            Puzzle: ":date",
          },
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Puzzle"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Puzzle" component={CodiacApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
