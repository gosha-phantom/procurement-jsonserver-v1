import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { counterReducer } from 'entities/_Counter';
import { procAuthLoginReducer } from 'entities/ProcAuthLogin';

import { procOrdersReducer } from 'entities/ProcOrders';
import { procOrderStatusReducer } from 'entities/ProcOrderStatus';
import { usersReducer } from 'entities/Users';
import { warehousesReducer } from 'entities/Warehouse';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';

// const rootReducers = (
// 	asyncReducers?: ReducersMapObject<StateSchema>) => {
// 	return {
// 		...asyncReducers,
//
// 		// counter: counterReducer,
// 		procAuthLogin: procAuthLoginReducer,
// 	};
// };
//
// const reducerManager = createReducerManager(rootReducers());
//
// export const store  = configureStore<StateSchema>({
// 	// reducer: {
// 	// 	counter: counterReducer,
// 	// 	procAuthLogin: procAuthLoginReducer,
// 	//
// 	// 	procOrders?: procOrdersReducer,
// 	//
// 	// 	// users: usersReducer,
// 	// 	// warehouses: warehousesReducer,
// 	// 	// procOrderStatus: procOrderStatusReducer,
// 	//
// 	// },
// 	reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
// 	// preloadedState: initialState,
// 	devTools: true,
// 	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
//
// // @ts-ignore
// // store.reducerManager = reducerManager;
//
// export type AppDispatch = typeof store.dispatch;

export function createStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducers: ReducersMapObject<StateSchema> ={
		...asyncReducers,

		counter: counterReducer,
		procAuthLogin: procAuthLoginReducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: true,
		preloadedState: initialState,
		// middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
