import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    lastSearch: null,
    lastSearchData: null,
    references: [],
    historic: [],
  },
  reducers: {
    setLastSearch(state, action) {
      state.lastSearch = action.payload;

      let lastItem =
        state.historic[
          state.historic.length > 0 ? state.historic.length - 1 : 0
        ];
      if (lastItem?.url != action.payload) {
        state.historic.push({
          id: state.historic.length + 1,
          url: action.payload,
          timestamp: new Date().valueOf(),
        });
      }
    },
    setLastSearchData(state, action) {
      state.lastSearchData = action.payload;
    },
    removeHistoric(state, action) {
      state.historic = state.historic.filter(
        (item) =>
          !action.payload.find((itemSelected) => itemSelected == item.id)
      );
    },
    clearHistoric(state, _) {
      state.historic = [];
    },
    addNewReferences(state, action) {
      state.references.push({
        ...state.lastSearchData,
        id: state.references.length + 1,
        url: state.lastSearch,
      });
    },
    removeReferences(state, action) {
      state.references = state.references.filter(
        (item) =>
          !action.payload.find((itemSelected) => itemSelected == item.id)
      );
    },
    clearReferences(state, _) {
      state.references = [];
    },
  },
});

export const {
  setLastSearch,
  setLastSearchData,
  removeHistoric,
  clearHistoric,
  addNewReferences,
  removeReferences,
  clearReferences,
} = navigationSlice.actions;
export default navigationSlice.reducer;
