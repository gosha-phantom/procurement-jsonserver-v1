import { configureStore } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider/config/StateSchema';
import { counterReducer } from 'entities/_Counter';
import { axiosInstance } from 'shared/axios/axiosInstance';

export function createReduxStore(initialState?: StateSchema) {

	const extraArg: ThunkExtraArg = {
		api: axiosInstance,
	};

	return configureStore<StateSchema>({
		reducer: {
			counter: counterReducer,
		},
		devTools: true,
		preloadedState: initialState,
		// @ts-ignore
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg,
			}
		}).concat()
	});
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
