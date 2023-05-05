import { createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';

import { buildSlice } from 'shared/lib';

import { Measure, MeasureSchema } from './measure.types';
import { getMeasures } from './measure.services';

const measuresAdapter = createEntityAdapter<Measure>({
	selectId: (measure) => measure.ID,
	// сортировка уже идет с сервера
	// sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const selectMeasures = measuresAdapter.getSelectors<StateSchema>(
	(state) => state.measures || measuresAdapter.getInitialState(),
);

const measuresSlice = buildSlice({
	name: 'measuresSlice',
	initialState: measuresAdapter.getInitialState<MeasureSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMeasures.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(getMeasures.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getMeasures.fulfilled, (state, action: PayloadAction<Measure[]>) => {
				state.isLoading = false;
				measuresAdapter.setAll(state, action.payload);
			});
	}
});

export const {
	reducer: measuresReducer,
	actions: measuresActions,
	useActions: useMeasuresActions
} = measuresSlice;
