import { configureStore } from "@reduxjs/toolkit";
import rightPanelReducer from "./rightPanelReducer";
import leftPanelReducer from "./leftPanelReducer";

const store = configureStore({
  reducer: { rightPanelReducer, leftPanelReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
