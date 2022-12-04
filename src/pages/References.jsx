import { useCallback, useState } from "react";
import { View, SafeAreaView, Text, FlatList, Keyboard } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import ListItem from "../components/ListItem";
import ConfirmPopup from "../components/ConfirmPopup";

import {
  clearReferences,
  removeReferences,
  setLastSearch,
} from "../app/store/slices/navigationSlice";

const References = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const dispatch = useDispatch();

  const references = useSelector((state) => state.navigation.references);

  const [deleteModal, setDeleteModal] = useState(false);
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

  const handleDeleteItemsSelected = () => {
    dispatch(removeReferences(deletedItems));
    setDeleteMode(false);
    setDeletedtems([]);
  };

  const handleDeleteFull = () => {
    dispatch(clearReferences());
    setDeleteMode(false);
    setDeletedtems([]);
    setDeleteModal(false);
  };

  return (
    <>
      <SafeAreaView style={tw("flex-1 bg-white")}>
        <View style={tw("flex-1 bg-white")}>
          <Header
            title="Your References"
            deleteMode={deleteMode}
            onPressDelete={handleDeleteItemsSelected}
            setDeleteMode={(value) => {
              setDeleteMode(value);
              setDeletedtems([]);
            }}
            deleteFullEnabled={references.length > 0}
            onDeleteFull={() => setDeleteModal(true)}
            selectData={{
              totalItems: references.length,
              totalSelected: deletedItems.length,
            }}
          />
          <FlatList
            data={[...references].reverse()}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                description={item.url}
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
            ItemSeparatorComponent={<View style={tw("my-1")} />}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={tw("mt-4")}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <ConfirmPopup
        visible={deleteModal}
        changeVisible={(value) => setDeleteModal(value)}
        onConfirmDelete={handleDeleteFull}
        title="Clear References"
        description="Here you will clear all your OPX references. This attitude has no turning back."
      />
    </>
  );
};

export default References;
