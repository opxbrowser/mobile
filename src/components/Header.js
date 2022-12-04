import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";
import { TabRouter, useNavigation } from "@react-navigation/native";

const Header = ({
  title,
  deleteMode,
  setDeleteMode,
  selectMode,
  setSelectMode,
}) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <>
      <View style={tw("p-4 flex-row justify-between items-center")}>
        <View style={tw("flex-row items-center")}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={25} />
          </TouchableOpacity>
          <Text style={tw("font-wMedium text-xl ml-4")}>{title}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setDeleteMode(TabRouter)}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={25}
              color={tw("text-primary").color}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[tw("bg-gray"), { height: 1 }]} />
    </>
  );
};

export default Header;
