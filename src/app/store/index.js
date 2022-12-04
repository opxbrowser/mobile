import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";

let store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});

store.subscribe(() => console.log(store.getState()));

export default store;
