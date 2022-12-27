import { useState, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import isAndroid from "../utils/isAndroid";

const InputBoss = memo(
  ({ pressOnSearch, optionsRef, hideOptions, ...rest }) => {
    const tw = useTailwind();

    const [boxOpened, setBoxOpened] = useState(false);

    return (
      <View>
        <View style={[tw("bg-primary-200 w-full"), { height: 1 }]} />
        <View style={tw("m-4 flex-row items-center")}>
          <InputItem {...rest} />
          {!hideOptions && (
            <ButtonBoss
              icon={
                boxOpened ? (
                  <MaterialCommunityIcons
                    name="close"
                    color={tw("text-primary").color}
                    size={boxOpened ? 18 : 22}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="chevron-up"
                    color={tw("text-primary").color}
                    size={22}
                  />
                )
              }
              onPress={() => {
                if (boxOpened) {
                  optionsRef?.current?.close();
                  setBoxOpened(false);
                  return;
                }

                optionsRef?.current?.open();
                setBoxOpened(true);
                return;
              }}
              containerStyle={tw("px-6 bg-gray")}
            />
          )}
          <ButtonBoss
            title="Go"
            containerStyle={tw("ml-2")}
            onPress={pressOnSearch}
          />
        </View>
      </View>
    );
  }
);

const ButtonBoss = ({ icon, title, onPress, containerStyle }) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[tw("bg-primary px-8 py-2 rounded-2xl"), containerStyle]}
      >
        {!title ? (
          icon
        ) : (
          <Text style={tw("font-wRegular text-base text-white")}>{title}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const InputItem = ({ inputStyle = {}, ...rest }) => {
  const tw = useTailwind();

  return (
    <TextInput
      {...rest}
      style={[
        tw(
          `bg-gray px-6 ${
            !isAndroid() ? "py-2.5" : "py-1.5"
          } rounded-2xl font-wRegular mr-2 flex-1`
        ),
        {
          fontSize: 16,
        },
        inputStyle,
      ]}
      placeholder="Enter website address"
      placeholderTextColor={tw("text-dark-500").color}
      autoCapitalize={"none"}
      autoCorrect={false}
      blurOnSubmit
      textContentType="URL"
      keyboardType="url"
    />
  );
};

export default InputBoss;
