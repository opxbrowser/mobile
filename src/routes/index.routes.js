import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainRoutes from "./Main.routes";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" style="dark" />
      <MainRoutes />
    </>
  );
};
