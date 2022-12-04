import { useCallback, useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";

import { getPreviewData } from "@flyerhq/react-native-link-preview";
import { useDispatch, useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Header from "../components/Header";
import ListItem from "../components/ListItem";
import ConfirmPopup from "../components/ConfirmPopup";

import {
  clearReferences,
  removeReferences,
  addNewReferences,
  setLastSearch,
} from "../app/store/slices/navigationSlice";
import { InputItem } from "../components/InputBoss";

const References = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const dispatch = useDispatch();

  const references = useSelector((state) => state.navigation.references);

  const animation = useRef(new Animated.Value(0)).current;

  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [showInput, setShowInput] = useState(false);

  const previousShowInput = useRef(showInput).current;

  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedItems, setDeletedtems] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    if (!!showInput) {
      Animated.spring(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (
      previousShowInput != undefined &&
      !showInput &&
      !previousShowInput
    ) {
      animation.setValue(0);
      animation.setOffset(0);
    }
  }, [showInput, animation]);

  const handleSearchAddress = (address) => {
    Keyboard.dismiss();
    let newSearchAddress = address;

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

  const handleSaveNewReference = async () => {
    try {
      setLoadingAddress(true);
      let newSearchAddress = searchAddress;

      if (!newSearchAddress.includes("https://")) {
        newSearchAddress = `https://${newSearchAddress}`;
      }

      const data = await getPreviewData(newSearchAddress);

      dispatch(
        addNewReferences({
          url: newSearchAddress,
          ...data,
        })
      );
    } finally {
      setLoadingAddress(false);
      setSearchAddress("");
      setShowInput(false);
    }
  };

  return (
    <>
      <SafeAreaView style={tw("flex-1 bg-white")}>
        <View style={tw("flex-1 bg-white")}>
          <Header
            title="Your References"
            referencesHeader
            newReferenceNow={showInput}
            loadingAddress={loadingAddress}
            addNewReference={() => setShowInput(true)}
            saveNewRerence={() => handleSaveNewReference()}
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
          {showInput && (
            <Animated.View
              style={[
                tw("flex-row mx-4 items-center"),
                {
                  opacity: animation,
                  marginTop: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 20],
                  }),
                },
              ]}
            >
              <InputItem
                value={searchAddress}
                onChangeText={(text) => setSearchAddress(text)}
                autoFocus
                editable={!loadingAddress}
              />
              {!loadingAddress && (
                <TouchableOpacity onPress={() => setShowInput(false)}>
                  <MaterialCommunityIcons
                    name="close"
                    color={tw("text-dark-400").color}
                    size={20}
                    style={tw("mr-1")}
                  />
                </TouchableOpacity>
              )}
            </Animated.View>
          )}
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
            contentContainerStyle={tw("mt-4 flex-1")}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={!showInput ? <EmptyState /> : null}
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

function EmptyState() {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 justify-center items-center mx-8")}>
      <Text style={tw("text-base font-wRegular text-dark-400 text-center")}>
        Here are all your saved references, where you can go back anytime and
        see your study references, inspiration and more.{" "}
        <Text style={tw("text-dark")}>
          Click on the icon and add a site as a reference.
        </Text>
      </Text>
    </View>
  );
}

export default References;
