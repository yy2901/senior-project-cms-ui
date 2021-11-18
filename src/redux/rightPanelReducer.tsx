import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RightPanelModal {
  TRASHCAN,
  TEMPLATE,
  ROUTE,
  ENTRY,
}

interface RightPanelState {
  modal: RightPanelModal | null;
  routeUrl: string | null;
  templateParent: string | null;
  entrySlug: string | null;
  refresher: number;
}

const initialState = {
  modal: null,
  routeUrl: null,
  templateParent: null,
  entrySlug: null,
  refresher: 0,
} as RightPanelState;

const rightPanelSlice = createSlice({
  name: "rightPanel",
  initialState,
  reducers: {
    setModal(state, action: PayloadAction<RightPanelModal>) {
      state.modal = action.payload;
    },
    setTemplateParent(state, action: PayloadAction<string>) {
      state.templateParent = action.payload;
      state.modal = RightPanelModal.TEMPLATE;
    },
    setEntrySlug(state, action: PayloadAction<string>) {
      state.entrySlug = action.payload;
      state.modal = RightPanelModal.ENTRY;
    },
    setRouteUrl(state, action: PayloadAction<string>) {
      state.routeUrl = action.payload;
      state.modal = RightPanelModal.ROUTE;
    },
    refreshRightPanel(state) {
      state.refresher++;
    },
  },
});

export const {
  setModal,
  setTemplateParent,
  setEntrySlug,
  setRouteUrl,
  refreshRightPanel,
} = rightPanelSlice.actions;
export default rightPanelSlice.reducer;
