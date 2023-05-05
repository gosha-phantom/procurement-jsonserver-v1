import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { Measure } from './measure.types';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getMeasures = createAsyncThunk<Measure[], void, ThunkConfig<string>>(
	'measure/getMeasureList',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<Measure[]>('/proc/v1/measures');

			if (!response.data) { throw new Error('Axios error by getting measures from DB!'); }

			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting measures from DB!');
		}
	}
);
