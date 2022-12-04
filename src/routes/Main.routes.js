import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Historic from "../pages/Historic";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Historic" component={Historic} />
    </Stack.Navigator>
  );
};
