import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    lastSearch: null,
    lastSearchData: null,
    references: [],
    historic: [],
    backPressClick: 1,
  },
  reducers: {
    setLastSearch(state, action) {
      if (action.payload === null) {
        state.lastSearch = null;
        return;
      }

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
    clearHistoric(state, action) {
      state.historic = [];
    },
    addNewReferences(state, action) {
      let data = {
        id: state.references.length + 1,
      };

      if (!action.payload) {
        data = {
          ...data,
          ...state.lastSearchData,
          url: state.lastSearch,
        };
      } else {
        data = {
          ...data,
          ...action.payload,
        };
      }

      state.references.push(data);
    },
    removeReferences(state, action) {
      state.references = state.references.filter(
        (item) =>
          !action.payload.find((itemSelected) => itemSelected == item.id)
      );
    },
    clearReferences(state, action) {
      state.references = [];
    },
    setSequenceHistoric(state, action) {
      let historicPosition =
        action.payload != "advance"
          ? state.historic.length - (state.backPressClick + 1)
          : state.historic.length - (state.backPressClick - 1);
      let lastHistoricData = state.historic[historicPosition];

      if (lastHistoricData) {
        state.backPressClick =
          action.payload != "advance"
            ? state.backPressClick + 1
            : state.backPressClick - 1;
        state.lastSearch = lastHistoricData.url;
      }
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
  setSequenceHistoric,
} = navigationSlice.actions;
export default navigationSlice.reducer;
