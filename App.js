import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

import Home from "./src/pages/Home";

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <Home />
      </TailwindProvider>
    </NavigationContainer>
  );
}
