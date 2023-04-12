import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcAuthLoginData } from './procAuthLogin.types';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { axiosInstance } from 'shared/axios/axiosInstance';

interface ProcAuthLoginProps {
    login?: string;
    password?: string;
}

export const postProcAuthLogin = createAsyncThunk<ProcAuthLoginData, ProcAuthLoginProps, ThunkConfig<string>>(
	'procAuthLogin/postProcAuthLogin',
	async(authData, thunkApi) => {
		try {
			const response = await axiosInstance.post<ProcAuthLoginData>('/proc/auth/login', authData);
			if (!response.data) { throw new Error('Axios error by getting procurement authorization data from DB!'); }

			// console.log(response.data);
			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting procurement authorization data from DB!');
		}
	}
);
