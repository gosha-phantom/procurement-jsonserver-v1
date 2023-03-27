import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ProcOrder, ProcOrderSchema } from './procOrders.types';
import { getProcOrders } from './procOrders.services';

const procOrdersAdapter = createEntityAdapter<ProcOrder>({
	selectId: (procOrder) => procOrder.id,
});

export const selectProcOrders = procOrdersAdapter.getSelectors<StateSchema>(
	(state) => state.procOrders || procOrdersAdapter.getInitialState(),
);

const procOrdersSlice = createSlice({
	name: 'procOrdersSlice',
	initialState: procOrdersAdapter.getInitialState<ProcOrderSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProcOrders.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(getProcOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getProcOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				procOrdersAdapter.addMany(state, action.payload);
			});
	},
});

export const {
	actions: procOrdersActions,
	reducer: procOrdersReducer
} = procOrdersSlice;
