import { useRef } from "react";
import { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    BackHandler,
    ToastAndroid,
    Text,
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
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

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
    const [hasPageNotFound, setHasPageNotFound] = useState(false);

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
        setHasPageNotFound(false);

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
                        {lastSearch &&
                            (hasPageNotFound === false ? (
                                <WebView
                                    style={tw("flex-1")}
                                    source={{ uri: lastSearch }}
                                    onLoadProgress={(e) => {
                                        setProgressValue(
                                            e.nativeEvent.progress
                                        );
                                        if (e.nativeEvent.progress >= 1) {
                                            loadFinished();
                                        }
                                    }}
                                    onLoadEnd={(e) => {
                                        dispatch(
                                            setLastSearchData(e.nativeEvent)
                                        );
                                        setSearchAddress(e.nativeEvent.url);
                                        loadFinished();
                                    }}
                                    onError={(e) => {
                                        if (
                                            e.nativeEvent.description ==
                                            "net::ERR_NAME_NOT_RESOLVED"
                                        ) {
                                            setHasPageNotFound(true);
                                        }
                                    }}
                                />
                            ) : (
                                <PageNotFound hideOptions={hideOptions} />
                            ))}
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

const PageNotFound = ({ hideOptions }) => {
    const tw = useTailwind();

    if (hideOptions) return <View style={tw("flex-1")}></View>;
    return (
        <View style={tw("flex-1 items-center justify-center")}>
            <MaskedView
                style={{
                    flexDirection: "row",
                    height: "100%",
                    transform: [
                        {
                            scale: 2,
                        },
                    ],
                }}
                maskElement={
                    <View
                        style={{
                            backgroundColor: "transparent",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={[
                                tw("font-wBold"),
                                {
                                    fontSize: 60,
                                    color: "black",
                                    fontWeight: "bold",
                                },
                            ]}
                        >
                            404
                        </Text>
                    </View>
                }
            >
                <LinearGradient
                    colors={["#8A4FFF", "#8A4FFF", "#FFF", "#FFFFFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.82 }}
                    style={{ flex: 1, height: "100%" }}
                />
            </MaskedView>
            <View
                style={tw(
                    "absolute bottom-44 flex justify-center items-center"
                )}
            >
                <Text style={tw("text-dark-400 text-xl mb-2 font-wRegular")}>
                    Page not found.
                </Text>
                <Text
                    style={tw("text-dark text-base text-center font-wRegular")}
                >
                    The page isn't really working or you {`\n`} typed the page
                    address wrong. Try again!
                </Text>
            </View>
        </View>
    );
};

export default Home;
