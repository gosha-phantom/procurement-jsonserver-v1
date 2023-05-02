import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';

import { Warehouse, WarehouseSchema } from './warehouse.types';
import { getWarehouses } from './warehouse.services';

const warehousesAdapter = createEntityAdapter<Warehouse>({
	selectId: (warehouse) => warehouse.id,
	// сортировка уже идет с сервера
	// sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const selectWarehouses = warehousesAdapter.getSelectors<StateSchema>(
	(state) => state.warehouses || warehousesAdapter.getInitialState(),
);

const warehousesSlice = createSlice({
	name: 'warehousesSlice',
	initialState: warehousesAdapter.getInitialState<WarehouseSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getWarehouses.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(getWarehouses.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getWarehouses.fulfilled, (state, action: PayloadAction<Warehouse[]>) => {
				state.isLoading = false;
				warehousesAdapter.setAll(state, action.payload);
			});
	}
});

export const {
	reducer: warehousesReducer,
	actions: warehousesActions,
} = warehousesSlice;
