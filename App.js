import { NavigationContainer } from "@react-navigation/native";

import { TailwindProvider } from "tailwind-rn";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";

import Sansation_Light from "./src/assets/fonts/Sansation_Light.ttf";

import Routes from "./src/routes/index.routes";

import { store, persistor } from "./src/app/store";
import utilities from "./tailwind.json";

export default function App() {
  let [fontsLoaded] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    Sansation_Light,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <TailwindProvider utilities={utilities}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </TailwindProvider>
    </SafeAreaProvider>
  );
}
