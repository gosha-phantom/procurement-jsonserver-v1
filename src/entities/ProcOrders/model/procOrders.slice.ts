import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { getProcOrders, getProcOrdersByUserID, deleteProcOrdersByOrderID } from './procOrders.services';
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
		myOrders: false,
		ids: [],
		entities: {},
	}),
	reducers: {
		// deleteProcOrderByIdFromState: (state, action: PayloadAction<number>) => {
		//     state.
		// }
	},
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
			})
			.addCase(deleteProcOrdersByOrderID.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(deleteProcOrdersByOrderID.fulfilled, (state, action) => {
				state.error = undefined;
			});
	},
});

export const {
	actions: procOrdersActions,
	reducer: procOrdersReducer
} = procOrdersSlice;
