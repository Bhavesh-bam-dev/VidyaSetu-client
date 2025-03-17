import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios, { AxiosError } from 'axios';

interface User {
	id: number;
	email: string;
	role: string;
	token: string;
}

interface RequestError {
	error: string;
	code?: string;
	field?: string;
}

interface AuthState {
	user: User | null;
	error: RequestError | null;
	loading: boolean;
}

const userEntry = localStorage.getItem('user');
const storedUser = userEntry && userEntry !== 'undefined' ? JSON.parse(userEntry) : null;

const initialState: AuthState = {
	user: storedUser,
	error: null,
	loading: false,
};

export const registerUser = createAsyncThunk<User, { email: string; role: string; password: string }, { rejectValue: RequestError }>(
	'auth/register',
	async (
		credential: {
			email: string;
			password: string;
			role: string;
		},
		thunkApi
	) => {
		try {
			const response = await axios.post('http://localhost:5000/api/auth/register', {
				email: credential.email,
				role: credential.role,
				password: credential.password,
			});
			return response.data;
		} catch (e) {
			const error = e as AxiosError<{
				error: string;
				code?: string;
				field?: string;
			}>;
			if (error.response) {
				return thunkApi.rejectWithValue(error.response.data);
			} else {
				return thunkApi.rejectWithValue({ error: 'An Error Occurred' });
			}
		}
	}
);

export const loginUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: RequestError }>(
	'auth/login',
	async (credential: { email: string; password: string }, thunkApi) => {
		try {
			const response = await axios.post('http://localhost:5000/api/auth/login', {
				email: credential.email,
				password: credential.password,
			});
			console.log('Login successfull:', response.data);
			return response.data.user;
		} catch (e) {
			const error = e as AxiosError<{
				error: string;
				code?: string;
				field?: string;
			}>;
			if (error.response) {
				return thunkApi.rejectWithValue(error.response.data);
			} else {
				return thunkApi.rejectWithValue({ error: 'An Error Occurred' });
			}
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('user');
			state.user = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true;
			state.error = null;
			state.user = null;
		});
		builder.addCase(registerUser.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload!;
		});
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
			localStorage.setItem('user', JSON.stringify(action.payload));
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload!;
		});
	},
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
