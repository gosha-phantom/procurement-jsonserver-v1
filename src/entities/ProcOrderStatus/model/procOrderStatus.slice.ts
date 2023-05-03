import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from 'shared/lib';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { ProcOrderStatus, ProcOrderStatusSchema } from './procOrderStatus.types';
import { getProcOrderStatus } from './procOrderStatus.services';

const procOrderStatusAdapter = createEntityAdapter<ProcOrderStatus>({
	selectId: (status) => status.ID,
	// сортировка уже реализована на сервере
	// sortComparer: (a, b) => a.ID.toString().localeCompare(b.ID.toString()),
});

export const selectProcOrderStatus = procOrderStatusAdapter.getSelectors<StateSchema>(
	(state) => state.procOrderStatus || procOrderStatusAdapter.getInitialState(),
);

const procOrderStatusSlice = buildSlice({
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
	useActions: useProcOrderStatusActions,
} = procOrderStatusSlice;
