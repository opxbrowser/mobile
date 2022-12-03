import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

const InputBoss = (props) => {
  const tw = useTailwind();

  return (
    <View>
      <View style={[tw("bg-primary w-full"), { height: 1 }]} />
      <View style={tw("m-4 flex-row items-center justify-evenly")}>
        <TextInput
          {...props}
          style={tw(
            "bg-gray px-6 py-2 rounded-2xl font-wRegular text-lg flex-1 mr-2"
          )}
          placeholder="Enter website address..."
          placeholderTextColor={tw("text-dark-500").color}
        />
        <ButtonBoss title="Ir" containerStyle={tw("px-6 bg-gray")} />
        <ButtonBoss title="Ir" containerStyle={tw("ml-2")} />
      </View>
    </View>
  );
};

const ButtonBoss = ({ icon, title, onPress, containerStyle }) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[tw("bg-primary px-8 py-2 rounded-2xl"), containerStyle]}>
        <Text style={tw("font-wRegular text-lg text-white")}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default InputBoss;
