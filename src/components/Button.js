import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useTailwind } from "tailwind-rn/dist";

const Button = ({ title, onPress, disabled, containerStyle, titleStyle }) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          tw("bg-primary rounded-xl justify-center items-center p-4"),
          containerStyle,
        ]}
      >
        <Text style={[tw("font-wMedium text-lg text-white"), titleStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
