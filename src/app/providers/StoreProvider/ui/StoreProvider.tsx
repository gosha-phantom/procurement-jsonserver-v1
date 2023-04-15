import { ReactNode, Suspense } from 'react';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { createStore, store } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;

	// asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props;

	// const store = createStore(
	// 	initialState as StateSchema,
	// 	asyncReducers as ReducersMapObject<StateSchema>
	// );

	return (
		<Provider store={store}>
			{/*<Suspense fallback="">*/}
			{children}
			{/*</Suspense>*/}
		</Provider>
	);
};
