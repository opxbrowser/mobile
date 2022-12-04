import React from "react";
import { View, SafeAreaView, Text, FlatList } from "react-native";

import { useTailwind } from "tailwind-rn/dist";

import Header from "../components/Header";

// import { Container } from './styles';

const Historic = () => {
  const tw = useTailwind();

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 bg-white")}>
        <Header title="Historic" />
        <FlatList data={[]} ListHeaderComponent={<ListHeader />} />
      </View>
    </SafeAreaView>
  );
};

const ListHeader = () => {
  const tw = useTailwind();

  return (
    <>
      <Text
        style={tw("text-sm mx-4 font-wRegular text-dark-400 text-justify mt-4")}
      >
        Total 20 addresses registered in your device. Remembering that you can
        remove everything easily clicking on the trash can or uninstalling the
        app.{" "}
        <Text style={tw("underline")}>
          Click and hold to remove some specific history.
        </Text>
      </Text>
    </>
  );
};

export default Historic;
