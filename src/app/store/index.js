import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistedReducer = persistReducer(
  {
    key: "root3",
    storage: AsyncStorage,
    timeout: 1000,
  },
  navigationReducer
);

export const store = configureStore({
  reducer: {
    navigation: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }),
});

export const persistor = persistStore(store);
