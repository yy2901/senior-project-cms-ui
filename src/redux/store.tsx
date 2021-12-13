import { configureStore } from "@reduxjs/toolkit";
import rightPanelReducer from "./rightPanelReducer";
import leftPanelReducer from "./leftPanelReducer";
import fileManagerReducer from "./fileManagerReducer";
import fontInjectionReducer from "./fontInjectionReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    rightPanelReducer,
    leftPanelReducer,
    fileManagerReducer,
    fontInjectionReducer,
    userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
