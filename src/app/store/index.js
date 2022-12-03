import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";

let store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});

export default store;
