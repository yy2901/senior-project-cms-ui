import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meta } from "../components/popup/fileManager/misc/types";

interface fileManagerState {
  open: boolean;
  selected: number;
  isInserting: boolean;
  refresher: number;
  selectedDetails: { [key: string]: any };
}

const initialState = {
  open: false,
  isInserting: false,
  refresher: 0,
  selected: -1,
  selectedDetails: {},
} as fileManagerState;

const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    toggleFileManager(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    toggleIsInserting(state, action: PayloadAction<boolean>) {
      state.isInserting = action.payload;
    },
    select(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
    refresh(state) {
      state.refresher++;
    },
    setCurrentDetails(state, action: PayloadAction<{ [key: string]: any }>) {
      state.selectedDetails = action.payload;
    },
  },
});

export const {
  toggleFileManager,
  toggleIsInserting,
  select,
  refresh,
  setCurrentDetails,
} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
