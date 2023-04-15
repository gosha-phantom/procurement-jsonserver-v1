import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { axiosInstance } from 'shared/axios/axiosInstance';
import { AxiosError, AxiosResponse } from 'axios/index';
import { ProcOrderCreateBody, ProcOrderCreateID } from './procOrderCreate.types';

export const postProcOrderCreate = createAsyncThunk<ProcOrderCreateID, ProcOrderCreateBody, ThunkConfig<string>>(
	'procOrderCreate/postProcOrderCreate',
	async(data, thunkApi) => {
		try {
			const response = await axiosInstance.post<ProcOrderCreateID, AxiosResponse<ProcOrderCreateID>>('/proc/orders/create', data);
			if (!response.data) { throw new Error('Axios error by creating procurement order data to DB!'); }

			return response.data;
		} catch(error) {
			let response = 'Error by creating procurement order data to DB!';
			if (error instanceof AxiosError) { response = error?.response?.data.message; }
			// console.log(typeof error);
			return thunkApi.rejectWithValue(response);
		}
	}
);
