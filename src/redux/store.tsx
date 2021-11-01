import { configureStore } from "@reduxjs/toolkit";
import rightPanelReducer from "./rightPanelReducer";
import leftPanelReducer from "./leftPanelReducer";
import fileManagerReducer from "./fileManagerReducer";

const store = configureStore({
  reducer: { rightPanelReducer, leftPanelReducer, fileManagerReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
