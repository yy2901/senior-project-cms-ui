import { createSlice } from "@reduxjs/toolkit";

interface LeftPanelState {
  refresher: number;
}

const initialState = {
  refresher: 0,
} as LeftPanelState;

const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    refreshLeftPanel(state) {
      state.refresher++;
    },
  },
});

export default leftPanelSlice.reducer;
export const { refreshLeftPanel } = leftPanelSlice.actions;
