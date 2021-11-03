import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileFieldType } from "../components/rightPanel/editor/EntryEditor/FileInstance";

interface fileManagerState {
  open: boolean;
  selected: number;
  isInserting: boolean;
  refresher: number;
  setFileField: (fileField: FileFieldType) => void;
}

const initialState = {
  open: false,
  isInserting: false,
  refresher: 0,
  selected: -1,
  setFileField: (fileField) => {},
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
    startInserting(state) {
      state.isInserting = true;
    },
    select(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
    refresh(state) {
      state.refresher++;
    },
    setFileFieldSetter(
      state,
      action: PayloadAction<(fileField: FileFieldType) => void>
    ) {
      state.setFileField = action.payload;
    },
  },
});

export const {
  toggleFileManager,
  startInserting,
  select,
  refresh,
  setFileFieldSetter,
} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
