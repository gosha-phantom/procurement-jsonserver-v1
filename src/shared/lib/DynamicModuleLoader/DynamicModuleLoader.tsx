import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { StateSchemaKey, StoreWithManager } from 'shared/config/stateConfig/StateSchema';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    children: ReactNode;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
	const {
		children, reducers, removeAfterUnmount= true
	} = props;

	const store = useStore() as StoreWithManager;
	const dispatch = useDispatch();

	// console.log(store);

	useEffect(() => {
		const mountedReducers = store.reducerManager.getMountedReducers();
		// console.log('DynamicModuleLoader mounted');

		Object.entries(reducers).forEach(([name, reducer]) => {
			const mounted = mountedReducers[name as StateSchemaKey];
			if (!mounted) {
				store.reducerManager.add(name as StateSchemaKey, reducer);
				dispatch({ type: `@INIT ${name} reducer` });
			}
		});

		return () => {
			// console.log('DynamicModuleLoader unmounted');
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]) => {
					store.reducerManager.remove(name as StateSchemaKey);
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
	// eslint-disable-next-line
	}, []);

	return (<>{children}</>);
};
