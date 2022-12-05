import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Historic from "../pages/Historic";
import References from "../pages/References";
import About from "../pages/About";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Historic" component={Historic} />
      <Stack.Screen name="References" component={References} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};
