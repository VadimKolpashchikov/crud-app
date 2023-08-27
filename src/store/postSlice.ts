import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../types/IPost";

export interface userState {
  mutablePost: IPost;
}

const initialState: userState = {
  mutablePost: {
    userId: 0,
    id: 0,
    title: "",
    body: "",
  },
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    getMutablePost: (state, action: PayloadAction<IPost>) => {
      state.mutablePost = action.payload;
    },
  },
});

export const { getMutablePost } = postSlice.actions;
export default postSlice.reducer;
