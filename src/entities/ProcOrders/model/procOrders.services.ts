import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcOrder } from './procOrders.types';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getProcOrders = createAsyncThunk<ProcOrder[], void, ThunkConfig<string>>(
	'procOrders/getProcOrders',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ProcOrder[]>('/procOrder?_sort=id&_order=desc');

			if (!response.data) { throw new Error('Axios error by getting procurement orders from DB!'); }

			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting procurement orders from DB!');
		}
	}
);
