import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import isAndroid from "../utils/isAndroid";

const InputBoss = (props) => {
  const tw = useTailwind();

  const [focused, setFocused] = useState(false);

  console.log(focused);

  return (
    <View style={{ marginBottom: !isAndroid() ? 15 : 0 }}>
      <View style={[tw("bg-primary-200 w-full"), { height: 1 }]} />
      <View style={tw("m-4 flex-row items-center justify-evenly")}>
        <TextInput
          {...props}
          style={tw(
            "bg-gray px-6 py-2 rounded-2xl font-wRegular text-base flex-1 mr-2"
          )}
          placeholder="Enter website ..."
          placeholderTextColor={tw("text-dark-500").color}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPointerLeave={() => setFocused(false)}
          onPressOut={() => !!focused && setFocused(false)}
        />
        <ButtonBoss
          icon={
            <MaterialCommunityIcons
              name="chevron-up"
              color={tw("text-primary").color}
              size={22}
            />
          }
          containerStyle={tw("px-6 bg-gray")}
        />
        <ButtonBoss title="Ir" containerStyle={tw("ml-2")} />
      </View>
    </View>
  );
};

const ButtonBoss = ({ icon, title, onPress, containerStyle }) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[tw("bg-primary px-8 py-2 rounded-2xl"), containerStyle]}>
        {!title ? (
          icon
        ) : (
          <Text style={tw("font-wRegular text-base text-white")}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default InputBoss;
