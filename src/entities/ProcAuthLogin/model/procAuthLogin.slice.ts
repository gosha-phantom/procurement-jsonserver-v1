import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PROC_AUTH_DATA, PROC_AUTH_TOKEN } from 'shared/consts/localstorage';
import { postProcAuthLogin } from './procAuthLogin.services';
import { ProcAuthLoginData, ProcAuthLoginSchema } from './procAuthLogin.types';

const initialState: ProcAuthLoginSchema = {
	error: undefined,
	isLoading: undefined,
	data: undefined
};

const procAuthLoginSlice = createSlice({
	name: 'procAuthLoginSlice',
	initialState,
	reducers: {
		setAuthDataToLC: (state, action: PayloadAction<ProcAuthLoginData>) => {
			localStorage.setItem(PROC_AUTH_DATA, JSON.stringify(action.payload));
			localStorage.setItem(PROC_AUTH_TOKEN, action.payload.token);
		},
		getAuthDataFromLC: (state) => {
			const user = localStorage.getItem(PROC_AUTH_DATA);
			if (user) {
				state.data = JSON.parse(user);
			}
		},
		logout: (state) => {
			localStorage.removeItem(PROC_AUTH_DATA);
			state.data = undefined;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postProcAuthLogin.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(postProcAuthLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(postProcAuthLogin.fulfilled, (state, action: PayloadAction<ProcAuthLoginData>) => {
				state.isLoading = false;
				state.data = action.payload;
			});
	},
});

export const {
	actions: procAuthLoginActions,
	reducer: procAuthLoginReducer
} = procAuthLoginSlice;
