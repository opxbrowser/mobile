import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useTailwind } from "tailwind-rn/dist";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Background from "../assets/background.png";
import Logo from "../assets/logo.svg";
import { useNavigation } from "@react-navigation/native";

const About = () => {
  const { width } = useWindowDimensions();
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <>
      <StatusBar translucent style="light" />
      <View style={tw("flex-1 bg-white")}>
        <ImageBackground
          style={[
            tw("px-4"),
            {
              width: width,
              height: 400,
              marginTop: -60,
            },
          ]}
          resizeMode="contain"
          source={Background}
        >
          <View style={tw("mt-28")}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={25}
                color={tw("text-white").color}
              />
            </TouchableOpacity>
            <Text
              style={[
                tw("ml-6 w-60 font-sLight text-white"),
                {
                  fontSize: 50,
                },
              ]}
            >
              Your easy and helper browser.
            </Text>
          </View>
        </ImageBackground>
        <Button title="About" />
        <Button title="Data Policy" />
        <Button title="Service Terms" />
        <Text style={tw("font-wMedium text-base my-6 self-center text-dark")}>
          {" "}
          @Opx Browser {Constants.expoConfig.version}
        </Text>
        <View style={tw("flex-1 justify-center items-center")}>
          <View>
            <Logo width={100} />
          </View>
        </View>
      </View>
    </>
  );
};

function Button({ title, onPress }) {
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          tw("px-4 py-4 bg-white"),
          {
            borderBottomWidth: 1,
            borderBottomColor: tw("text-gray").color,
          },
        ]}
      >
        <Text style={tw("text-lg font-wRegular text-primary")}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default About;
