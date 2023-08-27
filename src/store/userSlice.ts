import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  activeUser: number[];
}

const initialState: userState = {
  activeUser: JSON.parse(localStorage.getItem("crud-active-user") ?? "[]"),
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    toggToActiveUser: (state, action: PayloadAction<number>) => {
      if (state.activeUser.includes(action.payload)) {
        state.activeUser = state.activeUser.filter(
          (el) => el !== action.payload
        );
      } else {
        state.activeUser.push(action.payload);
      }
      localStorage.setItem(
        "crud-active-user",
        JSON.stringify(state.activeUser)
      );
    },
  },
});

export const { toggToActiveUser } = userSlice.actions;
export default userSlice.reducer;
