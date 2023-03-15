import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
  ToastAndroid,
} from "react-native";

import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import {
  setLastSearch,
  setLastSearchData,
  setSequenceHistoric,
} from "../app/store/slices/navigationSlice";

import { useSelector, useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn";
import { useNavigation, useRoute } from "@react-navigation/native";

import OptionsBox from "../components/OptionsBox";
import EmptyState from "../components/EmptyState";
import InputBoss from "../components/InputBoss";
import LoadingBar from "../components/LoadingBar";

import isAndroid from "../utils/isAndroid";

const Home = () => {
  var CLICKS_PER_SECONDS = 0;

  const tw = useTailwind();
  const navigation = useNavigation();
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
      navigation.setParams({
        address: null,
      });
    }
  }, [address, lastSearch]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", (e) => {
      setHideOptions(true);
    });
    Keyboard.addListener("keyboardDidHide", (e) => {
      setHideOptions(false);
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      CLICKS_PER_SECONDS++;

      setTimeout(() => {
        CLICKS_PER_SECONDS = 0;
      }, 300);

      if (CLICKS_PER_SECONDS >= 2) {
        CLICKS_PER_SECONDS = 0;
        return false;
      }

      ToastAndroid.show(
        "Pressione duas vezes rápido para sair do navegador.",
        ToastAndroid.SHORT
      );
      dispatch(setSequenceHistoric());
      return true;
    });
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
            {lastSearch && (
              <WebView
                style={tw("flex-1")}
                source={{ uri: lastSearch }}
                onLoadProgress={(e) => {
                  setProgressValue(e.nativeEvent.progress);
                  if (e.nativeEvent.progress >= 1) {
                    loadFinished();
                  }
                }}
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
            <OptionsBox ref={refBoxOptions} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
