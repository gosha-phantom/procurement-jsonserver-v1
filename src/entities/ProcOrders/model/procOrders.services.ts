import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcOrder } from './procOrders.types';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getProcOrders = createAsyncThunk<ProcOrder[], void, ThunkConfig<string>>(
	'procOrders/getProcOrders',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ProcOrder[]>('/proc/orders');
			if (!response.data) { throw new Error('Axios error by getting procurement orders from DB!'); }

			console.log(response.data);
			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting procurement orders from DB!');
		}
	}
);

export const getProcOrdersByUserID = createAsyncThunk<ProcOrder[], void, ThunkConfig<string>>(
	'procOrders/getProcOrdersByUserID',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ProcOrder[]>(`/proc/orders?userid=${23}`);
			if (!response.data) { throw new Error('Axios error by getting procurement orders by user ID from DB!'); }

			console.log(response.data);
			return response.data;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting procurement orders by user ID from DB!');
		}
	}
);

// temporary service for transforming data
// import { selectUsers } from 'entities/Users/model/users.slice';
// import { selectWarehouses } from 'entities/Warehouse/model/warehouse.slice';
// import { selectProcOrderStatus } from 'entities/ProcOrderStatus/model/procOrderStatus.slice';
// import { selectProcOrders } from '../model/procOrders.slice';
//
// export const getProcessedProcOrders = createAsyncThunk<ProcessedProcOrdersData[], boolean, ThunkConfig<string>>(
// 	'procOrders/getProcessedProcOrders',
// 	async (myOrders, thunkApi) => {
// 		const { getState, dispatch } = thunkApi;
//
// 		try {
// 			await dispatch(getProcOrders());
// 			const data = selectProcOrders.selectAll(getState());
// 			// const currentUser: {id: number} | undefined = undefined;
//
// 			// filter dataArray by user
// 			// if (myOrders && currentUser) {
// 			// 	return data.filter(row => row.userID === currentUser.id);
// 			// }
//
// 			// transform data to necessary view
// 			const getUserFullName = (id: number) => {
// 				const user = selectUsers.selectById(thunkApi.getState(), id);
// 				return `${user?.lastName} ${user?.firstName.charAt(0)}.`;
// 			};
//
// 			const getWarehouse = (id: number) => {
// 				return selectWarehouses.selectById(thunkApi.getState(), id)?.title;
// 			};
//
// 			const getOrderStatus = (id: number) => {
// 				return selectProcOrderStatus.selectById(thunkApi.getState(), id)?.title;
// 			};
//
//
// 			const processedData: ProcessedProcOrdersData[] = data.map(row => {
// 				return {
// 					id: row.id,
// 					user: getUserFullName(row.id),
// 					title: row.title,
// 					project: row.project,
// 					dateCreated: row.dateCreated,
// 					dateNeed: row.dateNeed,
// 					status: getOrderStatus(row.warehouseID),
// 					warehouse: getWarehouse(row.warehouseID),
// 					description: row.description,
// 					purchaser: getUserFullName(row.purchaserID),
// 				};
// 			});
//
// 			console.log(processedData);
// 			return processedData;
// 		} catch(error) {
// 			console.log(error);
// 			return thunkApi.rejectWithValue('Error by getting processed procurement orders from DB!');
// 		}
// 	}
// );
