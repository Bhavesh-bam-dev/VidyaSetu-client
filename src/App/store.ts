import { configureStore, Store } from "@reduxjs/toolkit";
import { authReducer } from "../components/Authentication/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
