import { configureStore } from "@reduxjs/toolkit";
import { jsonApi } from "./api/json.api";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
export const store = configureStore({
  reducer: {
    [jsonApi.reducerPath]: jsonApi.reducer,
    user: userSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
