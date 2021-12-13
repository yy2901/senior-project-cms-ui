import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  role: "DEVELOPER" | "EDITOR";
}

const initialState = {
  role: "EDITOR",
} as userState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchRole(state, action: PayloadAction<"DEVELOPER" | "EDITOR">) {
      state.role = action.payload;
    },
  },
});

export const { switchRole } = userSlice.actions;
export default userSlice.reducer;
