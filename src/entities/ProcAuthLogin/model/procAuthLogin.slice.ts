import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcAuthLoginData, ProcAuthLoginSchema } from './procAuthLogin.types';
import { postProcAuthLogin } from './procAuthLogin.services';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';

const procAuthLoginAdapter = createEntityAdapter<ProcAuthLoginData>({});

export const selectProcAuthLogin = procAuthLoginAdapter.getSelectors<StateSchema>(
	(state) => state.procAuthLogin || procAuthLoginAdapter.getInitialState(),
);

const procAuthLoginSlice = createSlice({
	name: 'procAuthLoginSlice',
	initialState: procAuthLoginAdapter.getInitialState<ProcAuthLoginSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
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
				procAuthLoginAdapter.setOne(state, action.payload);
			});
	},
});

export const {
	actions: procAuthLoginActions,
	reducer: procAuthLoginReducer
} = procAuthLoginSlice;
