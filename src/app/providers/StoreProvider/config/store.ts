import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { counterReducer } from 'entities/_Counter';
import { usersReducer } from 'entities/Users';
import { procOrdersReducer } from 'entities/ProcOrders';

export const store = configureStore<StateSchema>({
	reducer: {
		counter: counterReducer,
		users: usersReducer,
		procOrders: procOrdersReducer,
	},
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
