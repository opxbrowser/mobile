import { useState, useEffect } from "react";
import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";

import { WebView } from "react-native-webview";

import { setLastSearch } from "../app/store/slices/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn";

import EmptyState from "../components/EmptyState";
import InputBoss from "../components/InputBoss";
import isAndroid from "../utils/isAndroid";

const Home = () => {
  const tw = useTailwind();
  const dispatch = useDispatch();

  const lastSearch = useSelector((state) => state.navigation.lastSearch);

  const [searchAddress, setSearchAddress] = useState("");

  const handleSearchAddress = () => {
    let newSearchAddress = searchAddress;

    if (
      !newSearchAddress.includes("https://") ||
      !newSearchAddress.includes("http://")
    ) {
      newSearchAddress = `https://${newSearchAddress}`;
    }

    setSearchAddress(newSearchAddress);
    dispatch(setLastSearch(newSearchAddress));
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <KeyboardAvoidingView
        style={tw("flex-1 bg-white")}
        behavior={!isAndroid() ? "padding" : "height"}
      >
        {!lastSearch && <EmptyState />}
        {lastSearch && (
          <WebView style={tw("flex-1")} source={{ uri: lastSearch }} />
        )}
        <InputBoss
          value={searchAddress}
          onChangeText={(text) => setSearchAddress(text)}
          pressOnSearch={handleSearchAddress}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
