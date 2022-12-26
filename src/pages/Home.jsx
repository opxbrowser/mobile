import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import {
  setLastSearch,
  setLastSearchData,
} from "../app/store/slices/navigationSlice";

import { useSelector, useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn";
import { useRoute } from "@react-navigation/native";

import OptionsBox from "../components/OptionsBox";
import EmptyState from "../components/EmptyState";
import InputBoss from "../components/InputBoss";
import LoadingBar from "../components/LoadingBar";

import isAndroid from "../utils/isAndroid";

const Home = () => {
  const tw = useTailwind();
  const dispatch = useDispatch();
  const { params } = useRoute();

  const address = params?.address;

  const refBoxOptions = useRef(null);
  const lastSearch = useSelector((state) => state.navigation.lastSearch);

  const [searchAddress, setSearchAddress] = useState("");

  const [hideOptions, setHideOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (!!address && address != lastSearch) {
      handleSearchAddress(address);
    }
  }, [address, lastSearch]);

  useEffect(() => {
    let keyboard = [];

    keyboard[0] = Keyboard.addListener("keyboardWillShow", () => {
      setHideOptions(true);
    });

    keyboard[1] = Keyboard.addListener("keyboardWillHide", () => {
      setHideOptions(false);
    });

    return () => keyboard.map((item) => item.remove());
  }, []);

  const handleSearchAddress = (newAddress) => {
    let newSearchAddress = newAddress ?? searchAddress;

    if (!newSearchAddress && lastSearch) {
      dispatch(setLastSearch(null));
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    if (
      !newSearchAddress.includes("https://") &&
      !newSearchAddress.includes("http://")
    ) {
      newSearchAddress = `https://${newSearchAddress}`;
    }

    dispatch(setLastSearch(newSearchAddress));
  };

  const loadFinished = () => {
    setTimeout(() => {
      setLoading(false);
      setProgressValue(0);
    }, 1000);
  };

  return (
    <>
      <StatusBar translucent={false} />
      <SafeAreaView style={tw("flex-1 bg-white")}>
        <View style={tw("flex-1 bg-white")}>
          <KeyboardAvoidingView
            style={tw("flex-1 bg-white")}
            behavior={!isAndroid() ? "padding" : "height"}
          >
            {!lastSearch && <EmptyState />}
            <OptionsBox ref={refBoxOptions} />
            {lastSearch && (
              <WebView
                style={tw("flex-1")}
                source={{ uri: lastSearch }}
                onLoadProgress={(e) => setProgressValue(e.nativeEvent.progress)}
                onLoadEnd={(e) => {
                  dispatch(setLastSearchData(e.nativeEvent));
                  setSearchAddress(e.nativeEvent.url);
                  loadFinished();
                }}
              />
            )}
            <LoadingBar value={progressValue} loading={loading} />
            <InputBoss
              value={searchAddress}
              optionsRef={refBoxOptions}
              onChangeText={(text) => setSearchAddress(text)}
              pressOnSearch={() => handleSearchAddress()}
              hideOptions={hideOptions}
            />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
