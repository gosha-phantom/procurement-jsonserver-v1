import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcOrderCreateSchema, ProcOrderCreateID } from './procOrderCreate.types';
import { postProcOrderCreate } from './procOrderCreate.services';

const initialState: ProcOrderCreateSchema = {
	error: undefined,
	isLoading: undefined,
	procOrderBody: undefined,
	procOrderID: undefined,
	procOrderPosesBody: undefined,
};

const procOrderCreateSlice = createSlice({
	name: 'procOrderCreateSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postProcOrderCreate.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(postProcOrderCreate.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(postProcOrderCreate.fulfilled, (state, action: PayloadAction<ProcOrderCreateID>) => {
				state.isLoading = false;
				state.procOrderID = action.payload;
			});
	},
});

export const {
	actions: procOrderCreateActions,
	reducer: procOrderCreateReducer
} = procOrderCreateSlice;
