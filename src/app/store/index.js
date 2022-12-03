import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});
