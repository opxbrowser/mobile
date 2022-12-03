import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import { Provider } from "react-redux";

import Home from "./src/pages/Home";

import store from "./src/app/store";
import utilities from "./tailwind.json";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <Home />
        </TailwindProvider>
      </NavigationContainer>
    </Provider>
  );
}
