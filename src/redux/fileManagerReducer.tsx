import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface fileManagerState {
  open: boolean;
  selected: number;
  isInserting: boolean;
  refresher: number;
  insertingFilter: string[];
}

const initialState = {
  open: false,
  isInserting: false,
  refresher: 0,
  selected: -1,
  insertingFilter: [],
} as fileManagerState;

const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    toggleFileManager(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
      if (!action.payload) {
        state.isInserting = false;
        state.selected = -1;
      }
    },
    startInserting(state, action: PayloadAction<string[]>) {
      state.isInserting = true;
      state.insertingFilter = action.payload;
    },
    select(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
    refresh(state) {
      state.refresher++;
    },
  },
});

export const { toggleFileManager, startInserting, select, refresh } =
  fileManagerSlice.actions;
export default fileManagerSlice.reducer;
