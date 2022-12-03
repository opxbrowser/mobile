import React from "react";
import { View, Text } from "react-native";

import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn";

import EmptyState from "../components/EmptyState";

const Home = () => {
  const tw = useTailwind();
  const lastSearch = useSelector((state) => state.navigation.lastSearch);

  if (!lastSearch) return EmptyState;

  return <View style={tw("flex-1 bg-white")}></View>;
};

export default Home;
