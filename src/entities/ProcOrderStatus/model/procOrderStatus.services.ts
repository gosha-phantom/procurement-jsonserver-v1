import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcOrderStatus } from './procOrderStatus.types';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getProcOrderStatus = createAsyncThunk<ProcOrderStatus[], void, ThunkConfig<string>>(
	'status/getProcOrderStatus',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ProcOrderStatus[]>('/proc/v1/statuses');

			if (!response.data) { throw new Error('Axios error by getting procurement orders statuses from DB!'); }

			// console.log('Response data: ', response.data);
			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting procurement orders statuses from DB!');
		}
	}
);
