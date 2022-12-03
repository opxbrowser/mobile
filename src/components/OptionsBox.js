import { forwardRef, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn/dist";

const OptionsBox = forwardRef((props, ref) => {
  const tw = useTailwind();
  const { height } = useWindowDimensions();
  const containerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (ref) {
      ref.current = {
        open: () => {
          Animated.spring(containerAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        },
        close: () => {
          Animated.spring(containerAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        },
      };
    }
  }, [ref, containerAnimation]);

  return (
    <Animated.View
      style={[
        tw("bg-gray absolute mx-4 rounded-xl px-6 py-4 flex-row self-center"),
        {
          zIndex: 1,
          opacity: containerAnimation,
          bottom: 90,
          elevation: 10,
          shadowOffset: {
            height: 2,
            width: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          transform: [
            {
              translateY: containerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [height + 200, 0],
              }),
            },
          ],
        },
      ]}
    >
      <OptionItem
        icon={
          <MaterialCommunityIcons
            name="attachment"
            size={22}
            color={tw("text-primary").color}
          />
        }
        title="Save as reference"
      />
      <OptionItem
        icon={
          <MaterialCommunityIcons
            name="clock-outline"
            size={22}
            color={tw("text-primary").color}
          />
        }
        title="Historic"
      />
      <OptionItem
        icon={
          <MaterialCommunityIcons
            name="attachment"
            size={22}
            color={tw("text-primary").color}
          />
        }
        title="References"
      />
      <OptionItem
        icon={
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={22}
            color={tw("text-white").color}
          />
        }
        title="More"
      />
    </Animated.View>
  );
});

const OptionItem = ({ onPress, icon, title }) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tw("justify-center items-center")}>
        <View
          style={tw(
            "bg-primary-400 rounded-xl w-14 h-10 rounded-xl justify-center items-center"
          )}
        >
          {icon}
        </View>
        <Text
          style={tw(
            "text-xs font-wRegular mt-2 text-dark-500 w-20 text-center"
          )}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionsBox;
