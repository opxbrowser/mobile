import { useRef } from "react";
import { View, Text } from "react-native";
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
      <View style={tw("mx-8")}>
        <Text style={tw("text-center text-lg font-wRegular text-primary-400")}>
          To fly we need to have space and OPX helps you with that.
        </Text>
        <Text style={tw("text-center text-base font-wRegular text-black mt-4")}>
          Fly over your favorite site and enjoy referrals.
        </Text>
      </View>
    </View>
  );
};

export default EmptyState;
