import React from "react";
import { View, SafeAreaView, Text, FlatList } from "react-native";

import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";

import Header from "../components/Header";
import ListItem from "../components/ListItem";

import { getTextTime } from "../utils/textDate";

const Historic = () => {
  const tw = useTailwind();
  const historic = useSelector((state) => state.navigation.historic);

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 bg-white")}>
        <Header title="Historic" />
        <FlatList
          data={[...historic].reverse()}
          renderItem={({ item }) => (
            <ListItem
              title={item.url}
              description={getTextTime(item.timestamp)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
          ItemSeparatorComponent={<View style={tw("my-1")} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    </SafeAreaView>
  );
};

const ListHeader = () => {
  const tw = useTailwind();

  return (
    <View style={tw("mb-6")}>
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
    </View>
  );
};

export default Historic;
