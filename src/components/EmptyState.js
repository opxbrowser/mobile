import { useRef } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import LottieView from "lottie-react-native";

const EmptyState = () => {
  const tw = useTailwind();
  const animation = useRef(null);
  return (
    <View style={tw("flex-1 justify-center items-center bg-white")}>
      <LottieView
        ref={animation}
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#FFFFFF",
        }}
        loop
        source={require("../assets/animations/emptyloadingpurple.json")}
      />
    </View>
  );
};

export default EmptyState;
