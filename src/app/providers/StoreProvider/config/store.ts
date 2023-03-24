import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { counterReducer } from 'entities/_Counter';

export function createReduxStore(initialState?: StateSchema) {

	return configureStore<StateSchema>({
		reducer: {
			counter: counterReducer,
		},
		preloadedState: initialState,
		devTools: true,
	});
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
