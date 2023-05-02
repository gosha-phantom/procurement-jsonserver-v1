import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { PROC_AUTH_DATA, PROC_AUTH_TOKEN } from 'shared/consts/localstorage';
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
			const response = await axiosInstance.post<ProcAuthLoginData, AxiosResponse<ProcAuthLoginData>>('/proc/v1/auth/login', authData);
			if (!response.data) { throw new Error('Axios error by getting procurement authorization data from DB!'); }

			// console.log(response.data);
			localStorage.setItem(PROC_AUTH_DATA, JSON.stringify(response.data));
			localStorage.setItem(PROC_AUTH_TOKEN, response.data.token);

			return response.data;
		} catch(error) {
			let response = 'Error by getting procurement authorization data from DB!';
			if (error instanceof AxiosError) { response = error?.response?.data.message; }
			// console.log(typeof error);
			return thunkApi.rejectWithValue(response);
		}
	}
);
