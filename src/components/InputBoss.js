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

const InputBoss = ({ pressOnSearch, ...rest }) => {
  const tw = useTailwind();

  return (
    <View>
      <View style={[tw("bg-primary-200 w-full"), { height: 1 }]} />
      <View style={tw("m-4 flex-row items-center")}>
        <TextInput
          {...rest}
          style={[
            tw("bg-gray px-6 py-2.5 rounded-2xl font-wRegular mr-2 flex-1"),
            {
              fontSize: 16,
            },
          ]}
          placeholder="Enter website address"
          placeholderTextColor={tw("text-dark-500").color}
          autoCapitalize={"none"}
          autoCorrect={false}
          blurOnSubmit
          textContentType="URL"
          keyboardType="url"
        />

        <ButtonBoss
          icon={
            <MaterialCommunityIcons
              name="chevron-up"
              color={tw("text-primary").color}
              size={22}
            />
          }
          containerStyle={tw("px-6 bg-gray")}
        />
        <ButtonBoss
          title="Ir"
          containerStyle={tw("ml-2")}
          onPress={pressOnSearch}
        />
      </View>
    </View>
  );
};

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

export default InputBoss;
