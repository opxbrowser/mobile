import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { WebView } from "react-native-webview";

import { setLastSearch } from "../app/store/slices/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn";

import OptionsBox from "../components/OptionsBox";
import EmptyState from "../components/EmptyState";
import InputBoss from "../components/InputBoss";
import LoadingBar from "../components/LoadingBar";

import isAndroid from "../utils/isAndroid";

const Home = () => {
  const tw = useTailwind();
  const dispatch = useDispatch();

  const refBoxOptions = useRef(null);
  const lastSearch = useSelector((state) => state.navigation.lastSearch);

  const [searchAddress, setSearchAddress] = useState("");
  const [hideOptions, setHideOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

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

  const handleSearchAddress = () => {
    setLoading(true);
    let newSearchAddress = searchAddress;

    if (
      !newSearchAddress.includes("https://") ||
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
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <LoadingBar value={progressValue} loading={loading} />
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
            cacheEnabled
            cacheMode="LOAD_CACHE_ONLY"
            onLoadProgress={(e) => setProgressValue(e.nativeEvent.progress)}
            onLoadEnd={() => loadFinished()}
          />
        )}
        <InputBoss
          value={searchAddress}
          optionsRef={refBoxOptions}
          onChangeText={(text) => setSearchAddress(text)}
          pressOnSearch={handleSearchAddress}
          hideOptions={hideOptions}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
