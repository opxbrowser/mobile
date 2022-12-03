import React from "react";
import { View, Text } from "react-native";

import { useTailwind } from "tailwind-rn";

const Home = () => {
  const tw = useTailwind();
  return (
    <View style={tw("flex-1 justify-center")}>
      <Text>Ola</Text>
    </View>
  );
};

export default Home;
