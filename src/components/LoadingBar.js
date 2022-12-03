import React, { useRef, useEffect, memo } from "react";
import { Animated } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTailwind } from "tailwind-rn/dist";

const LinearComponent = Animated.createAnimatedComponent(LinearGradient);

const LoadingBar = memo(({ value, loading }) => {
  const tw = useTailwind();

  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!!value) {
      Animated.timing(animationValue, {
        toValue: value,
        useNativeDriver: false,
      }).start();
    }
  }, [value]);

  if (!loading || value <= 0) return null;

  return (
    <LinearComponent
      colors={["#fff", tw("text-primary").color]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        tw("h-1"),
        {
          width: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
        },
      ]}
    />
  );
});

export default LoadingBar;
