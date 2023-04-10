import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { counterReducer } from 'entities/_Counter';
import { procOrderStatusReducer } from 'entities/ProcOrderStatus';
import { usersReducer } from 'entities/Users';
import { procOrdersReducer } from 'entities/ProcOrders';
import { warehousesReducer } from 'entities/Warehouse';

export const store = configureStore<StateSchema>({
	reducer: {
		counter: counterReducer,
		// users: usersReducer,
		procOrders: procOrdersReducer,
		// warehouses: warehousesReducer,
		// procOrderStatus: procOrderStatusReducer,
	},
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
