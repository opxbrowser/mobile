import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, useWindowDimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTailwind } from "tailwind-rn/dist";
import Button from "./Button";

const ConfirmPopup = ({
  title,
  description,
  onConfirmDelete,
  visible,
  changeVisible,
}) => {
  const tw = useTailwind();
  const { height } = useWindowDimensions();

  const [containerVisibile, setContainerVisible] = useState(false);

  const previousVisible = useRef(visible).current;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!!visible) {
      setContainerVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (previousVisible != undefined && !visible && !previousVisible) {
      Animated.timing(animation, {
        toValue: false,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setContainerVisible(false));
    }
  }, [visible, previousVisible]);

  if (!containerVisibile) return null;

  return (
    <Animated.View
      style={[
        tw("absolute inset-0 z-10"),
        {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [height + 200, 0],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.5)", tw("text-primary-400").color]}
        style={tw("flex-1 justify-center px-4")}
      >
        <View style={tw("bg-white rounded-3xl p-6")}>
          <Text style={tw("text-xl text-center font-wMedium text-dark")}>
            {title}
          </Text>
          <Text
            style={tw("text-base my-4 text-center font-wMedium text-dark-400")}
          >
            {description}
          </Text>
          <View style={tw("mt-4")}>
            <Button title={"Excluir"} onPress={onConfirmDelete} />
            <Button
              title={"Fechar"}
              containerStyle={tw("mt-2 bg-gray")}
              titleStyle={tw("text-dark-500")}
              onPress={() => changeVisible(false)}
            />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default ConfirmPopup;
