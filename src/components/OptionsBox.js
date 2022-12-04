import { forwardRef, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { addNewReferences } from "../app/store/slices/navigationSlice";

const OptionsBox = forwardRef((props, ref) => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const { references, lastSearch } = useSelector((state) => state.navigation);
  const dispatch = useDispatch();

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

  const isReferenceSaved = useMemo(
    () => references.find((item) => item.url == lastSearch),
    [references, lastSearch]
  );

  return (
    <Animated.View
      style={[
        tw("bg-gray absolute mx-4 rounded-xl p-4"),
        {
          zIndex: 1,
          opacity: containerAnimation,
          bottom: 90,
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
      <View style={tw("flex-row items-center mb-4")}>
        <MaterialCommunityIcons
          name={"cog"}
          size={30}
          color={tw("text-primary-400").color}
        />
        <Text style={tw("text-xl font-wSemibold ml-4 text-dark-500")}>
          Options
        </Text>
      </View>
      <View style={tw("flex-row self-center")}>
        <OptionItem
          icon={
            <>
              <MaterialCommunityIcons
                name={!!isReferenceSaved ? "check-decagram" : "attachment"}
                size={22}
                color={tw("text-primary").color}
              />
              {!isReferenceSaved && (
                <Text
                  style={[
                    tw("font-wMedium text-primary text-xl absolute"),
                    {
                      top: -5,
                      right: 10,
                    },
                  ]}
                >
                  +
                </Text>
              )}
            </>
          }
          title={
            !!isReferenceSaved
              ? "Saved in your references"
              : "Save as reference"
          }
          isReferenceSaved={isReferenceSaved}
          disabled={isReferenceSaved || !lastSearch}
          onPress={() => dispatch(addNewReferences())}
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
          onPress={() => navigation.navigate("Historic")}
        />
        <OptionItem
          icon={
            <MaterialCommunityIcons
              name="attachment"
              size={22}
              color={tw("text-primary").color}
            />
          }
          onPress={() => navigation.navigate("References")}
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
          onPress={() => navigation.navigate("About")}
        />
      </View>
    </Animated.View>
  );
});

export const OptionItem = ({
  onPress,
  icon,
  title,
  disabled = false,
  isReferenceSaved,
}) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={tw(
          `justify-center items-center ${
            !!disabled && !isReferenceSaved ? "opacity-50" : ""
          }`
        )}
      >
        {!!icon && (
          <View
            style={tw(
              "bg-primary-400 rounded-xl w-14 h-10 rounded-xl justify-center items-center"
            )}
          >
            {icon}
          </View>
        )}
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
