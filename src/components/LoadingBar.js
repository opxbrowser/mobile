import React, { useRef, useEffect, memo, useState } from "react";
import { Animated } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTailwind } from "tailwind-rn/dist";

const LinearComponent = Animated.createAnimatedComponent(LinearGradient);

const LoadingBar = memo(({ value, loading }) => {
  const tw = useTailwind();

  const [showsLoadingBar, setShowsLoadingBar] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const animationValue2 = useRef(new Animated.Value(0)).current;
  const previousValue = useRef(value).current;

  useEffect(() => {
    if (!!value) {
      setShowsLoadingBar(true);
      Animated.sequence([
        Animated.timing(animationValue2, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.spring(animationValue, {
          toValue: value,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (previousValue != undefined && !value && !previousValue) {
      Animated.timing(animationValue2, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        animationValue2.setOffset(0);
        animationValue2.setValue(0);
        setShowsLoadingBar(false);
      });
    }
  }, [value]);

  if (!showsLoadingBar) return null;

  return (
    <LinearComponent
      colors={["#fff", tw("text-primary").color]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        tw("h-1 mx-4 my-2 rounded-full"),
        {
          opacity: animationValue2,
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
