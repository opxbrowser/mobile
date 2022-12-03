import React from "react";
import { View, Text } from "react-native";

import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn";

import EmptyState from "../components/EmptyState";
import InputBoss from "../components/InputBoss";

const Home = () => {
  const tw = useTailwind();
  const lastSearch = useSelector((state) => state.navigation.lastSearch);

  return (
    <View style={tw("flex-1 bg-white")}>
      {!lastSearch && <EmptyState />}
      <InputBoss />
    </View>
  );
};

export default Home;
