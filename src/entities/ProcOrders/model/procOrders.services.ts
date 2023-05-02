import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ProcOrder } from './procOrders.types';
import { selectProcOrdersMyOrders } from './procOrders.selectors';
import { selectProcAuthData } from 'entities/ProcAuthLogin';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getProcOrders = createAsyncThunk<ProcOrder[], void, ThunkConfig<string>>(
	'procOrders/getProcOrders',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ProcOrder[]>('/proc/v1/orders');
			if (!response.data) { throw new Error('Axios error by getting procurement orders from DB!'); }

			console.log(response.data);
			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting procurement orders from DB!');
		}
	}
);

export const getProcOrdersByUserID = createAsyncThunk<ProcOrder[], number | undefined, ThunkConfig<string>>(
	'procOrders/getProcOrdersByUserID',
	async(userID, thunkApi) => {
		try {
			if (!userID) { throw new Error('UserID is missing!');}

			const response = await axiosInstance.get<ProcOrder[]>(`/proc/v1/userorders?userid=${userID}`);
			if (!response.data) { throw new Error('Axios error by getting procurement orders by user ID from DB!'); }

			console.log(response.data);
			return response.data;
		} catch(error) {
			console.log(error);
			let response = 'Error by getting procurement orders by user ID from DB!';
			if (error instanceof AxiosError) { response = error?.response?.data.message; }
			return thunkApi.rejectWithValue(response);
		}
	}
);

export const deleteProcOrdersByOrderID = createAsyncThunk<ProcOrder[], number | undefined, ThunkConfig<string>>(
	'procOrders/deleteProcOrdersByOrderID',
	async(orderID, thunkApi) => {
		try {
			if (!orderID) { throw new Error('Order ID is missing!');}

			const response = await axiosInstance.get<ProcOrder[]>(`/proc/v1/orders/delete/${orderID}`);

			if (!response.data) { throw new Error('Axios error by deleting procurement order by order ID from DB!'); }

			const myOrders = selectProcOrdersMyOrders(thunkApi.getState());
			const userAuthData = selectProcAuthData(thunkApi.getState());
			if (!myOrders) {
				thunkApi.dispatch(getProcOrdersByUserID(userAuthData?.ID));
			} else {
				thunkApi.dispatch(getProcOrders());
			}

			return response.data;
		} catch(error) {
			console.log(error, typeof error);
			let response = 'Error by deleting procurement order by order ID from DB!';
			if (error instanceof AxiosError) { response = error?.response?.data.message; }
			return thunkApi.rejectWithValue(response);
		}
	}
);
