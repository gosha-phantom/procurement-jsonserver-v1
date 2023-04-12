import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { ProcOrderStatus, ProcOrderStatusSchema } from './procOrderStatus.types';
import { getProcOrderStatus } from './procOrderStatus.services';

const procOrderStatusAdapter = createEntityAdapter<ProcOrderStatus>({
	selectId: (status) => status.id,
	sortComparer: (a, b) => a.id.toString().localeCompare(b.id.toString()),
});

export const selectProcOrderStatus = procOrderStatusAdapter.getSelectors<StateSchema>(
	(state) => state.procOrderStatus || procOrderStatusAdapter.getInitialState(),
);

const procOrderStatusSlice = createSlice({
	name: 'procOrderStatusSlice',
	initialState: procOrderStatusAdapter.getInitialState<ProcOrderStatusSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProcOrderStatus.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(getProcOrderStatus.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getProcOrderStatus.fulfilled, (state, action: PayloadAction<ProcOrderStatus[]>) => {
				state.isLoading = false;
				procOrderStatusAdapter.setAll(state, action.payload);
			});
	}
});

export const {
	reducer: procOrderStatusReducer,
	actions: procOrderStatusActions,
} = procOrderStatusSlice;
