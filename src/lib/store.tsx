import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
