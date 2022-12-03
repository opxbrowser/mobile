import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    references: [],
    historic: [],
  },
  reducers: {
    addNewHistoric(state, action) {
      state.historic.push(...action.paylaod);
    },
    removeHistoric(state, action) {
      state.historic = state.historic.filter(
        (item) => item.id != action.payload.id
      );
    },
    clearHistoric(state, _) {
      state.historic = [];
    },
    addNewReferences(state, action) {
      state.references.push(...action.paylaod);
    },
    removeReferences(state, action) {
      state.references = state.references.filter(
        (item) => item.id != action.payload.id
      );
    },
  },
});

export const {
  addNewHistoric,
  removeHistoric,
  clearHistoric,
  addNewReferences,
  removeReferences,
} = navigationSlice.actions;
export default navigationSlice.reducer;
