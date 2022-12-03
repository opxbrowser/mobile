import React from "react";
import { View, Text } from "react-native";

import { useTailwind } from "tailwind-rn";

const Home = () => {
  const tw = useTailwind();
  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <Text style={tw("text-3xl font-wRegular text-primary")}>Ola</Text>
    </View>
  );
};

export default Home;
