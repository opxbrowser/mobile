import { useCallback, useState } from "react";
import { View, SafeAreaView, Text, FlatList, Keyboard } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import ListItem from "../components/ListItem";

import {
  removeHistoric,
  setLastSearch,
} from "../app/store/slices/navigationSlice";

import { getTextTime } from "../utils/textDate";

const Historic = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const dispatch = useDispatch();

  const historic = useSelector((state) => state.navigation.historic);

  const [deletedItems, setDeletedtems] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleSearchAddress = (searchAddress) => {
    Keyboard.dismiss();
    let newSearchAddress = searchAddress;

    if (!newSearchAddress.includes("https://")) {
      newSearchAddress = `https://${newSearchAddress}`;
    }

    dispatch(setLastSearch(newSearchAddress));
    navigation.goBack();
  };

  const handleDeleteItem = useCallback(
    (id) => {
      if (!deleteMode) setDeleteMode(true);

      if (!!deletedItems.find((item) => item == id)) {
        let newList = deletedItems.filter((item) => item != id);
        if (newList.length > 0) {
          setDeletedtems(newList);
        } else {
          setDeleteMode(false);
          setDeletedtems([]);
        }
        return;
      }

      setDeletedtems([...deletedItems, id]);
    },
    [deletedItems, deleteMode]
  );

  const handleDeleteItemsSelected = useCallback(() => {
    dispatch(removeHistoric(deletedItems));
    setDeleteMode(false);
    setDeletedtems([]);
  }, [deletedItems]);

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 bg-white")}>
        <Header
          title="Historic"
          deleteMode={deleteMode}
          onPressDelete={handleDeleteItemsSelected}
          setDeleteMode={(value) => {
            setDeleteMode(value);
            setDeletedtems([]);
          }}
          selectData={{
            totalItems: historic.length,
            totalSelected: deletedItems.length,
          }}
        />
        <FlatList
          data={[...historic].reverse()}
          renderItem={({ item }) => (
            <ListItem
              title={item.url}
              description={getTextTime(item.timestamp)}
              onPress={() =>
                deleteMode
                  ? handleDeleteItem(item.id)
                  : handleSearchAddress(item.url)
              }
              selected={
                !!deletedItems.find((selectItem) => selectItem == item.id)
              }
              onSelect={() => handleDeleteItem(item.id)}
            />
          )}
          ListHeaderComponent={<ListHeader total={historic.length} />}
          ItemSeparatorComponent={<View style={tw("my-1")} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    </SafeAreaView>
  );
};

const ListHeader = ({ total = 0 }) => {
  const tw = useTailwind();

  return (
    <View style={tw("mb-6")}>
      <Text
        style={tw("text-sm mx-4 font-wRegular text-dark-400 text-justify mt-4")}
      >
        Total {total} {total > 1 ? "addresses" : "address"} registered in your
        device. Remembering that you can remove everything easily clicking on
        the trash can or uninstalling the app.{" "}
        <Text style={tw("underline")}>
          Click and hold to remove some specific history.
        </Text>
      </Text>
    </View>
  );
};

export default Historic;
