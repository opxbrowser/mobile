import { useCallback, useRef } from "react";
import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

// import { Container } from './styles';

const ListItem = ({ title, description }) => {
  const tw = useTailwind();

  const messageAnimation = useRef(new Animated.Value(1)).current;

  const animateMessageIn = useCallback(() => {
    Animated.spring(messageAnimation, {
      toValue: 0.95,
      duration: 120,
      useNativeDriver: true,
      friction: 2,
    }).start();
  }, [messageAnimation]);

  const animateMessageOut = useCallback(() => {
    Animated.spring(messageAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      friction: 2,
    }).start();
  }, [messageAnimation]);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => animateMessageIn()}
      onPressOut={() => animateMessageOut()}
    >
      <Animated.View
        style={[
          tw("bg-primary-200 mx-4 px-6 py-4 rounded-xl"),
          {
            transform: [
              {
                scale: messageAnimation,
              },
            ],
          },
        ]}
      >
        <Text style={tw("font-wRegular text-base")}>{title}</Text>
        <Text style={tw("font-wMedium mt-1 text-primary")}>{description}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ListItem;
