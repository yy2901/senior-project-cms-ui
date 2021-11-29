import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresher: 0,
};

const fontInjectionReducer = createSlice({
  name: "fontInjecction",
  initialState,
  reducers: {
    refreshFontInjection: (state) => {
      state.refresher++;
    },
  },
});

export default fontInjectionReducer.reducer;
export const { refreshFontInjection } = fontInjectionReducer.actions;
