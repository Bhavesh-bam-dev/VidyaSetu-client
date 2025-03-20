import { configureStore, Store } from '@reduxjs/toolkit';
import { authReducer } from '../components/Authentication/authSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
