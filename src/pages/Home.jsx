import { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";

import { WebView } from "react-native-webview";

import { setLastSearch } from "../app/store/slices/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTailwind } from "tailwind-rn";

import EmptyState from "../components/EmptyState";
import InputBoss from "../components/InputBoss";

const Home = () => {
  const tw = useTailwind();
  const dispatch = useDispatch();

  const lastSearch = useSelector((state) => state.navigation.lastSearch);

  const [searchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    if (!!lastSearch) {
      setSearchAddress(lastSearch);
    }
  }, [lastSearch]);

  const handleSearchAddress = () => {
    let newSearchAddress = searchAddress;

    if (
      !newSearchAddress.includes("https://") ||
      !newSearchAddress.includes("http://")
    ) {
      newSearchAddress = `https://${newSearchAddress}`;
    }

    console.log(newSearchAddress);

    dispatch(setLastSearch(newSearchAddress));
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 bg-white")}>
        {!lastSearch && <EmptyState />}
        {lastSearch && (
          <WebView style={tw("flex-1")} source={{ uri: searchAddress }} />
        )}
        <InputBoss
          value={searchAddress}
          onChangeText={(text) => setSearchAddress(text)}
          pressOnSearch={handleSearchAddress}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
