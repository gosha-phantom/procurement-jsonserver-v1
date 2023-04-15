import { memo } from 'react';
import { Counter, counterReducer } from 'entities/_Counter';
import { DynamicModuleLoader, ReducersList } from 'shared/lib';
import classes from './MainPage.module.scss';

// const reducers: ReducersList = {
// 	counter: counterReducer,
// };

const MainPage = () => {

	return (
		// <DynamicModuleLoader reducers={reducers}>
		<main className={classes.MainPage}>
			<Counter />
		</main>
		// </DynamicModuleLoader>

	);
};

export default memo(MainPage);
