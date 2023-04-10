import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getProcOrders, getProcOrdersByUserID } from './procOrders.services';
import { ProcOrder, ProcOrderSchema } from './procOrders.types';

const procOrdersAdapter = createEntityAdapter<ProcOrder>({
	selectId: (procOrder) => procOrder.ID,
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
			.addCase(getProcOrders.fulfilled, (state, action: PayloadAction<ProcOrder[]>) => {
				state.isLoading = false;
				procOrdersAdapter.setAll(state, action.payload);
			})
			.addCase(getProcOrdersByUserID.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(getProcOrdersByUserID.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getProcOrdersByUserID.fulfilled, (state, action: PayloadAction<ProcOrder[]>) => {
				state.isLoading = false;
				procOrdersAdapter.setAll(state, action.payload);
			});
		// temporary service for transforming data
		// 	.addCase(getProcessedProcOrders.fulfilled, (state, action: PayloadAction<ProcessedProcOrdersData[]>) => {
		// 		state.processedProcOrders = action.payload;
		// 	});
	},
});

export const {
	actions: procOrdersActions,
	reducer: procOrdersReducer
} = procOrdersSlice;
