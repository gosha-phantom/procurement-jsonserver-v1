import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { axiosInstance } from 'shared/axios/axiosInstance';
import { AxiosError } from 'axios';
import { ProcOrderPosesUpsert } from './procOrderPosesUpsert.types';

interface ProcOrderPosesBodyRequest {
    orderID: number;
    procOrderPoses: ProcOrderPosesUpsert[]
}

interface ProcOrderPosesCreateResponse {
    message: string;
}

export const postProcOrderPosesCreate = createAsyncThunk<ProcOrderPosesCreateResponse, ProcOrderPosesBodyRequest, ThunkConfig<string>>(
	'procOrderPosesCreate/postProcOrderPosesCreate',
	async(data, thunkApi) => {
		const { rejectWithValue, dispatch } = thunkApi;

		console.log('WE ARE HERE!!!', data);

		try {
			const response = await axiosInstance.post<ProcOrderPosesCreateResponse>('/proc/v1/orderposes', data);
			if (!response.data) { throw new Error('Axios error by creating procurement order poses data to DB!'); }

			return response.data;
		} catch(error) {
			let response = 'Error by creating procurement order poses data to DB!';
			if (error instanceof AxiosError) { response = error?.response?.data.message; }
			// console.log(typeof error);
			return rejectWithValue(response);
		}
	}
);
