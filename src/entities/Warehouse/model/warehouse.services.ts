import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Warehouse } from './warehouse.types';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getWarehouses = createAsyncThunk<Warehouse[], void, ThunkConfig<string>>(
	'warehouses/getWarehouseList',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<Warehouse[]>('/warehouse');

			if (!response.data) { throw new Error('Axios error by getting warehouses from DB!'); }

			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting warehouses from DB!');
		}
	}
);
