import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    lastSearch: null,
    references: [],
    historic: [],
  },
  reducers: {
    setLastSearch(state, action) {
      state.lastSearch = action.payload;
    },
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
    addNewReferences(state, _) {
      state.references.push({
        id: state.references.length + 1,
        url: state.lastSearch,
      });
    },
    removeReferences(state, action) {
      state.references = state.references.filter(
        (item) => item.id != action.payload.id
      );
    },
  },
});

export const {
  setLastSearch,
  addNewHistoric,
  removeHistoric,
  clearHistoric,
  addNewReferences,
  removeReferences,
} = navigationSlice.actions;
export default navigationSlice.reducer;
