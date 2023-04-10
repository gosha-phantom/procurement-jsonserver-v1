import { ReactNode } from 'react';
import { DeepPartial } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { store } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children } = props;

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
